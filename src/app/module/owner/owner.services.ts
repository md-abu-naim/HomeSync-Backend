import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status";
import { ICreatePropertyPayload, IUpdatePropertyPayload } from "./owner.interface";
import { cloudinary } from "../../lib/cloudinary";
import { UploadApiResponse } from "cloudinary";


const createProperty = async (payload: ICreatePropertyPayload, userId: string, image: Express.Multer.File | null) => {
    const { title, description, propertyType, address, city, area, latitude, longitude, totalRooms } = payload;

    const owner = await prisma.owner.findUnique({
        where: {
            userId: userId
        }
    })

    if (!owner) {
        throw new AppError(httpStatus.NOT_FOUND, "Owner Profile Not Found");
    }

    const ImagesLink = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            resource_type: 'auto'
        },
            async (error, result) => {
                if (error) {
                    return reject(error.message)
                }

                if (!result) {
                    return reject(new AppError(httpStatus.INTERNAL_SERVER_ERROR, "No Result Renturned"))
                }

                resolve(result)
            }
        ).end(image?.buffer)
    })

    const property = await prisma.property.create({
        data: {
            ownerId: owner.id,
            title,
            description,
            propertyType: propertyType,
            address,
            city,
            imageUrl: ImagesLink.secure_url,
            imagePublicId: ImagesLink.public_id,
            area,
            latitude,
            longitude,
            totalRooms
        },
        include: {
            owner: true,
            rooms: true,
        },
    });

    return property;
};

const getMyProperties = async (userId: string) => {
    const owner = await prisma.owner.findUnique({
        where: {
            userId,
        },
    });

    if (!owner) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Owner Profile Not Found"
        );
    }

    const properties = await prisma.property.findMany({
        where: {
            ownerId: owner.id,
            isDeleted: false,
        },
        include: {
            rooms: true,
            owner: true
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return properties;
};

const updateProperty = async (propertyId: string, userId: string, payload: IUpdatePropertyPayload, image: Express.Multer.File | null) => {
    const owner = await prisma.owner.findUnique({
        where: {
            userId,
        },
    });

    if (!owner) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Owner Profile Not Found"
        );
    }

    const property = await prisma.property.findFirst({
        where: {
            id: propertyId,
            ownerId: owner.id,
            isDeleted: false,
        },
    });

    if (!property) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Property Not Found or You are not the owner"
        );
    }

    let imageUrl = property.imageUrl;
    let imagePublicId = property.imagePublicId;

    if (image) {
        const uploadedImage = await new Promise<UploadApiResponse>(
            (resolve, reject) => {

                cloudinary.uploader.upload_stream(
                    {
                        resource_type: "auto",
                    },
                    (error, result) => {

                        if (error) {
                            return reject(error);
                        }

                        if (!result) {
                            return reject(
                                new AppError(
                                    httpStatus.INTERNAL_SERVER_ERROR,
                                    "Image upload failed"
                                )
                            );
                        }

                        resolve(result);
                    }
                ).end(image.buffer);
            }
        );

        imageUrl = uploadedImage.secure_url;
        imagePublicId = uploadedImage.public_id;

        if (property.imagePublicId) {
            await cloudinary.uploader.destroy(
                property.imagePublicId
            );
        }
    }

    const updatedProperty = await prisma.property.update({
        where: {
            id: propertyId,
        },

        data: {
            ...payload,
            imageUrl,
            imagePublicId,
        },

        include: {
            owner: true,
            rooms: true,
        },
    });

    return updatedProperty;
};

export const OwnerServices = {
    createProperty, getMyProperties,
    updateProperty
};
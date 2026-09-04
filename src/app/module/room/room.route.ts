import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { validationRequest } from "../../utils/validationRequest";
import { RoomController } from "./room.controller";
import { createRoomValidationSchema, updateRoomAvailabilityValidationSchema, updateRoomValidationSchema } from "./room.validation";

const router = Router();

router.post(
    "/property/:propertyId",
    auth(Role.OWNER), validationRequest(createRoomValidationSchema),
    RoomController.createRoom
);
router.get("/property/:propertyId", RoomController.getPropertyRooms);
router.get("/:id", RoomController.getRoomById)
router.patch(
    "/:id",
    auth(Role.OWNER), validationRequest(updateRoomValidationSchema),
    RoomController.updateRoom
);
router.delete("/:id", auth(Role.OWNER), RoomController.deleteRoom);
router.patch(
    "/availability/:id",
    auth(Role.OWNER),
    validationRequest(updateRoomAvailabilityValidationSchema),
    RoomController.updateRoomAvailability
);

export const RoomRoutes = router;
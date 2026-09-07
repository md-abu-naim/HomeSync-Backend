
      import { createRequire } from 'module';
      const require = createRequire(import.meta.url);
    
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_cookie_parser = __toESM(require("cookie-parser"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_express10 = __toESM(require("express"), 1);
var import_http_status22 = __toESM(require("http-status"), 1);
var import_helmet = __toESM(require("helmet"), 1);

// src/app/middleware/notFound.ts
var import_http_status = __toESM(require("http-status"), 1);
var notFound = (req, res) => {
  res.status(import_http_status.default.NOT_FOUND).json({
    message: "Route not found",
    path: req.originalUrl,
    date: /* @__PURE__ */ new Date()
  });
};

// src/app/middleware/globalErrorHandler.ts
var import_http_status2 = __toESM(require("http-status"), 1);

// generated/prisma/client.ts
var path = __toESM(require("path"), 1);
var import_node_url = require("url");

// generated/prisma/internal/class.ts
var runtime = __toESM(require("@prisma/client/runtime/client"), 1);
var config = {
  "previewFeatures": [],
  "clientVersion": "7.10.0",
  "engineVersion": "0edf323efd1d98336f3f0a68684b56f689b900d3",
  "activeProvider": "postgresql",
  "inlineSchema": 'enum Role {\n  OWNER\n  TENANT\n  ADMIN\n}\n\nenum AuthProvider {\n  CREDENTIAL\n  GOOGLE\n}\n\nenum UserStatus {\n  ACTIVE\n  BLOCKED\n  DELETED\n}\n\nenum PropertyType {\n  APARTMENT\n  HOUSE\n  HOSTEL\n  ROOM\n}\n\nenum PropertyStatus {\n  ACTIVE\n  INACTIVE\n}\n\nenum RoomType {\n  SINGLE\n  DOUBLE\n  SHARED\n}\n\nenum RoomAvailability {\n  AVAILABLE\n  RESERVED\n  OCCUPIED\n}\n\nenum Gender {\n  MALE\n  FEMALE\n  OTHER\n}\n\nenum VerificationStatus {\n  PENDING\n  VERIFIED\n  REJECTED\n}\n\nenum ApplicationStatus {\n  PENDING\n  APPROVED\n  REJECTED\n  CANCELLED\n}\n\nenum PaymentProvider {\n  BKASH\n  STRIPE\n  SSLCOMMERZ\n}\n\nenum PaymentStatus {\n  UNPAID\n  PAID\n  FAILED\n  CANCELLED\n  REFUNDED\n}\n\nenum PaymentType {\n  RENT\n  SECURITY_DEPOSIT\n  BOOKING_FEE\n}\n\nenum SleepSchedule {\n  EARLY_BIRD\n  NIGHT_OWL\n  FLEXIBLE\n}\n\nmodel Owner {\n  id     String @id @default(uuid())\n  userId String @unique\n\n  phone   String?\n  address String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  properties Property[]\n\n  @@index([userId])\n  @@map("owners")\n}\n\nmodel Payment {\n  id String @id @default(uuid())\n\n  status PaymentStatus @default(UNPAID)\n\n  amount   Decimal @db.Decimal(10, 2)\n  currency String  @default("BDT")\n\n  paymentGateway        PaymentProvider @default(BKASH)\n  merchantInvoiceNumber String?         @unique\n\n  bkashPaymentId String? @unique\n  bkashTrxId     String?\n\n  payerReference String?\n\n  paidAt String?\n\n  gatewayResponse Json?\n\n  refundTrxId  String?\n  refundAmount Decimal? @db.Decimal(10, 2)\n  refundReason String?\n  refundedAt   String?\n\n  userId     String\n  propertyId String\n  roomId     String\n\n  rentalId String @unique\n\n  user     User     @relation(fields: [userId], references: [id])\n  property Property @relation(fields: [propertyId], references: [id])\n  room     Room     @relation(fields: [roomId], references: [id])\n\n  application Rental @relation(fields: [rentalId], references: [id], onDelete: Cascade, onUpdate: Cascade)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId])\n  @@index([propertyId])\n  @@index([roomId])\n  @@index([status])\n  @@index([paymentGateway])\n  @@index([createdAt])\n  @@map("payments")\n}\n\nmodel Property {\n  id      String @id @default(uuid())\n  ownerId String\n\n  title       String\n  description String?\n\n  propertyType PropertyType @default(HOUSE)\n\n  address String\n  city    String?\n  area    String?\n\n  imageUrl      String @default("")\n  imagePublicId String @default("")\n\n  latitude  Decimal? @db.Decimal(10, 7)\n  longitude Decimal? @db.Decimal(10, 7)\n\n  totalRooms Int @default(1)\n\n  status PropertyStatus @default(ACTIVE)\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  owner Owner @relation(fields: [ownerId], references: [id], onDelete: Cascade)\n\n  rooms        Room[]\n  applications Rental[]\n  payments     Payment[]\n\n  @@index([ownerId])\n  @@index([city])\n  @@index([area])\n  @@index([propertyType])\n  @@index([status])\n  @@index([isDeleted])\n  @@index([createdAt])\n  @@map("properties")\n}\n\nmodel Rental {\n  id String @id @default(uuid())\n\n  tenantId   String\n  propertyId String\n  roomId     String\n\n  message        String?\n  proposedMoveIn DateTime?\n\n  status ApplicationStatus @default(PENDING)\n\n  reviewedAt DateTime?\n  reviewNote String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  tenant   Tenant   @relation(fields: [tenantId], references: [id])\n  property Property @relation(fields: [propertyId], references: [id])\n  room     Room     @relation(fields: [roomId], references: [id])\n\n  payment Payment?\n\n  @@index([tenantId])\n  @@index([propertyId])\n  @@index([roomId])\n  @@index([status])\n  @@index([createdAt])\n  @@map("rentals")\n}\n\nmodel Room {\n  id         String @id @default(uuid())\n  propertyId String\n\n  roomNumber  String\n  title       String?\n  description String?\n\n  roomType RoomType @default(SINGLE)\n\n  amount          Decimal  @db.Decimal(10, 2)\n  securityDeposit Decimal? @db.Decimal(10, 2)\n\n  capacity         Int @default(1)\n  currentOccupants Int @default(0)\n\n  availability RoomAvailability @default(AVAILABLE)\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  property Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)\n\n  applications Rental[]\n  payments     Payment[]\n\n  @@unique([propertyId, roomNumber])\n  @@index([propertyId])\n  @@index([availability])\n  @@index([roomType])\n  @@index([amount])\n  @@index([isDeleted])\n  @@index([createdAt])\n  @@map("rooms")\n}\n\nmodel Roommate {\n  id       String @id @default(uuid())\n  tenantId String @unique\n\n  gender Gender?\n\n  smokingAllowed Boolean @default(false)\n  petsAllowed    Boolean @default(false)\n\n  preferredLocation String?\n\n  minBudget Decimal? @db.Decimal(10, 2)\n  maxBudget Decimal? @db.Decimal(10, 2)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  tenant Tenant @relation(fields: [tenantId], references: [id], onDelete: Cascade)\n\n  @@index([tenantId])\n  @@index([gender])\n  @@index([preferredLocation])\n  @@index([minBudget, maxBudget])\n  @@map("roommates")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Tenant {\n  id     String @id @default(uuid())\n  userId String @unique\n\n  phone      String?\n  occupation String?\n  bio        String?\n\n  gender Gender? @default(MALE)\n\n  preferredLocation String?\n\n  minBudget Decimal? @db.Decimal(10, 2)\n  maxBudget Decimal? @db.Decimal(10, 2)\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  roommate     Roommate?\n  applications Rental[]\n\n  @@index([userId])\n  @@index([gender])\n  @@index([preferredLocation])\n  @@index([minBudget, maxBudget])\n  @@map("tenants")\n}\n\nmodel User {\n  id String @id @default(uuid())\n\n  name     String\n  email    String  @unique\n  password String?\n\n  googleId     String?      @unique\n  authProvider AuthProvider @default(CREDENTIAL)\n\n  isEmailVerified Boolean @default(false)\n\n  role   Role       @default(TENANT)\n  status UserStatus @default(ACTIVE)\n\n  needPasswordChange Boolean @default(false)\n\n  imageUrl      String @default("")\n  imagePublicId String @default("")\n\n  isDeleted Boolean   @default(false)\n  deletedAt DateTime?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  owner  Owner?\n  tenant Tenant?\n\n  payments Payment[]\n\n  @@index([role])\n  @@index([status])\n  @@index([isDeleted])\n  @@index([createdAt])\n  @@map("users")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Owner":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"OwnerToUser"},{"name":"properties","kind":"object","type":"Property","relationName":"OwnerToProperty"}],"dbName":"owners","schema":null},"Payment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"PaymentStatus"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"currency","kind":"scalar","type":"String"},{"name":"paymentGateway","kind":"enum","type":"PaymentProvider"},{"name":"merchantInvoiceNumber","kind":"scalar","type":"String"},{"name":"bkashPaymentId","kind":"scalar","type":"String"},{"name":"bkashTrxId","kind":"scalar","type":"String"},{"name":"payerReference","kind":"scalar","type":"String"},{"name":"paidAt","kind":"scalar","type":"String"},{"name":"gatewayResponse","kind":"scalar","type":"Json"},{"name":"refundTrxId","kind":"scalar","type":"String"},{"name":"refundAmount","kind":"scalar","type":"Decimal"},{"name":"refundReason","kind":"scalar","type":"String"},{"name":"refundedAt","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"propertyId","kind":"scalar","type":"String"},{"name":"roomId","kind":"scalar","type":"String"},{"name":"rentalId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"PaymentToUser"},{"name":"property","kind":"object","type":"Property","relationName":"PaymentToProperty"},{"name":"room","kind":"object","type":"Room","relationName":"PaymentToRoom"},{"name":"application","kind":"object","type":"Rental","relationName":"PaymentToRental"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"payments","schema":null},"Property":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"ownerId","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"propertyType","kind":"enum","type":"PropertyType"},{"name":"address","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"area","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"imagePublicId","kind":"scalar","type":"String"},{"name":"latitude","kind":"scalar","type":"Decimal"},{"name":"longitude","kind":"scalar","type":"Decimal"},{"name":"totalRooms","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"PropertyStatus"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"owner","kind":"object","type":"Owner","relationName":"OwnerToProperty"},{"name":"rooms","kind":"object","type":"Room","relationName":"PropertyToRoom"},{"name":"applications","kind":"object","type":"Rental","relationName":"PropertyToRental"},{"name":"payments","kind":"object","type":"Payment","relationName":"PaymentToProperty"}],"dbName":"properties","schema":null},"Rental":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tenantId","kind":"scalar","type":"String"},{"name":"propertyId","kind":"scalar","type":"String"},{"name":"roomId","kind":"scalar","type":"String"},{"name":"message","kind":"scalar","type":"String"},{"name":"proposedMoveIn","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"ApplicationStatus"},{"name":"reviewedAt","kind":"scalar","type":"DateTime"},{"name":"reviewNote","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"tenant","kind":"object","type":"Tenant","relationName":"RentalToTenant"},{"name":"property","kind":"object","type":"Property","relationName":"PropertyToRental"},{"name":"room","kind":"object","type":"Room","relationName":"RentalToRoom"},{"name":"payment","kind":"object","type":"Payment","relationName":"PaymentToRental"}],"dbName":"rentals","schema":null},"Room":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"propertyId","kind":"scalar","type":"String"},{"name":"roomNumber","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"roomType","kind":"enum","type":"RoomType"},{"name":"amount","kind":"scalar","type":"Decimal"},{"name":"securityDeposit","kind":"scalar","type":"Decimal"},{"name":"capacity","kind":"scalar","type":"Int"},{"name":"currentOccupants","kind":"scalar","type":"Int"},{"name":"availability","kind":"enum","type":"RoomAvailability"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"property","kind":"object","type":"Property","relationName":"PropertyToRoom"},{"name":"applications","kind":"object","type":"Rental","relationName":"RentalToRoom"},{"name":"payments","kind":"object","type":"Payment","relationName":"PaymentToRoom"}],"dbName":"rooms","schema":null},"Roommate":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tenantId","kind":"scalar","type":"String"},{"name":"gender","kind":"enum","type":"Gender"},{"name":"smokingAllowed","kind":"scalar","type":"Boolean"},{"name":"petsAllowed","kind":"scalar","type":"Boolean"},{"name":"preferredLocation","kind":"scalar","type":"String"},{"name":"minBudget","kind":"scalar","type":"Decimal"},{"name":"maxBudget","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"tenant","kind":"object","type":"Tenant","relationName":"RoommateToTenant"}],"dbName":"roommates","schema":null},"Tenant":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"occupation","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"gender","kind":"enum","type":"Gender"},{"name":"preferredLocation","kind":"scalar","type":"String"},{"name":"minBudget","kind":"scalar","type":"Decimal"},{"name":"maxBudget","kind":"scalar","type":"Decimal"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"TenantToUser"},{"name":"roommate","kind":"object","type":"Roommate","relationName":"RoommateToTenant"},{"name":"applications","kind":"object","type":"Rental","relationName":"RentalToTenant"}],"dbName":"tenants","schema":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"googleId","kind":"scalar","type":"String"},{"name":"authProvider","kind":"enum","type":"AuthProvider"},{"name":"isEmailVerified","kind":"scalar","type":"Boolean"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"needPasswordChange","kind":"scalar","type":"Boolean"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"imagePublicId","kind":"scalar","type":"String"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"deletedAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"owner","kind":"object","type":"Owner","relationName":"OwnerToUser"},{"name":"tenant","kind":"object","type":"Tenant","relationName":"TenantToUser"},{"name":"payments","kind":"object","type":"Payment","relationName":"PaymentToUser"}],"dbName":"users","schema":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","owner","user","tenant","roommate","orderBy","cursor","property","applications","room","application","payments","_count","rooms","payment","properties","Owner.findUnique","Owner.findUniqueOrThrow","Owner.findFirst","Owner.findFirstOrThrow","Owner.findMany","data","Owner.createOne","Owner.createMany","Owner.createManyAndReturn","Owner.updateOne","Owner.updateMany","Owner.updateManyAndReturn","create","update","Owner.upsertOne","Owner.deleteOne","Owner.deleteMany","having","_min","_max","Owner.groupBy","Owner.aggregate","Payment.findUnique","Payment.findUniqueOrThrow","Payment.findFirst","Payment.findFirstOrThrow","Payment.findMany","Payment.createOne","Payment.createMany","Payment.createManyAndReturn","Payment.updateOne","Payment.updateMany","Payment.updateManyAndReturn","Payment.upsertOne","Payment.deleteOne","Payment.deleteMany","_avg","_sum","Payment.groupBy","Payment.aggregate","Property.findUnique","Property.findUniqueOrThrow","Property.findFirst","Property.findFirstOrThrow","Property.findMany","Property.createOne","Property.createMany","Property.createManyAndReturn","Property.updateOne","Property.updateMany","Property.updateManyAndReturn","Property.upsertOne","Property.deleteOne","Property.deleteMany","Property.groupBy","Property.aggregate","Rental.findUnique","Rental.findUniqueOrThrow","Rental.findFirst","Rental.findFirstOrThrow","Rental.findMany","Rental.createOne","Rental.createMany","Rental.createManyAndReturn","Rental.updateOne","Rental.updateMany","Rental.updateManyAndReturn","Rental.upsertOne","Rental.deleteOne","Rental.deleteMany","Rental.groupBy","Rental.aggregate","Room.findUnique","Room.findUniqueOrThrow","Room.findFirst","Room.findFirstOrThrow","Room.findMany","Room.createOne","Room.createMany","Room.createManyAndReturn","Room.updateOne","Room.updateMany","Room.updateManyAndReturn","Room.upsertOne","Room.deleteOne","Room.deleteMany","Room.groupBy","Room.aggregate","Roommate.findUnique","Roommate.findUniqueOrThrow","Roommate.findFirst","Roommate.findFirstOrThrow","Roommate.findMany","Roommate.createOne","Roommate.createMany","Roommate.createManyAndReturn","Roommate.updateOne","Roommate.updateMany","Roommate.updateManyAndReturn","Roommate.upsertOne","Roommate.deleteOne","Roommate.deleteMany","Roommate.groupBy","Roommate.aggregate","Tenant.findUnique","Tenant.findUniqueOrThrow","Tenant.findFirst","Tenant.findFirstOrThrow","Tenant.findMany","Tenant.createOne","Tenant.createMany","Tenant.createManyAndReturn","Tenant.updateOne","Tenant.updateMany","Tenant.updateManyAndReturn","Tenant.upsertOne","Tenant.deleteOne","Tenant.deleteMany","Tenant.groupBy","Tenant.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","AND","OR","NOT","id","name","email","password","googleId","AuthProvider","authProvider","isEmailVerified","Role","role","UserStatus","status","needPasswordChange","imageUrl","imagePublicId","isDeleted","deletedAt","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","every","some","none","userId","phone","occupation","bio","Gender","gender","preferredLocation","minBudget","maxBudget","tenantId","smokingAllowed","petsAllowed","propertyId","roomNumber","title","description","RoomType","roomType","amount","securityDeposit","capacity","currentOccupants","RoomAvailability","availability","roomId","message","proposedMoveIn","ApplicationStatus","reviewedAt","reviewNote","ownerId","PropertyType","propertyType","address","city","area","latitude","longitude","totalRooms","PropertyStatus","PaymentStatus","currency","PaymentProvider","paymentGateway","merchantInvoiceNumber","bkashPaymentId","bkashTrxId","payerReference","paidAt","gatewayResponse","refundTrxId","refundAmount","refundReason","refundedAt","rentalId","string_contains","string_starts_with","string_ends_with","array_starts_with","array_ends_with","array_contains","propertyId_roomNumber","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "6gRQgAELAgAAjgIAIA8AAMwCACCYAQAAywIAMJkBAAADABCaAQAAywIAMJsBAQAAAAGsAUAAgAIAIa0BQACAAgAhvAEBAAAAAb0BAQD6AQAh3QEBAPoBACEBAAAAAQAgCwIAAI4CACAPAADMAgAgmAEAAMsCADCZAQAAAwAQmgEAAMsCADCbAQEA-QEAIawBQACAAgAhrQFAAIACACG8AQEA-QEAIb0BAQD6AQAh3QEBAPoBACEBAAAAAwAgEwIAAI4CACAEAACPAgAgCAAAkAIAIJgBAACLAgAwmQEAAAUAEJoBAACLAgAwmwEBAPkBACGqASAA_AEAIasBQAD_AQAhrAFAAIACACGtAUAAgAIAIbwBAQD5AQAhvQEBAPoBACG-AQEA-gEAIb8BAQD6AQAhwQEAAIwCwQEjwgEBAPoBACHDARAAjQIAIcQBEACNAgAhAQAAAAUAIA4DAACTAgAgmAEAAJICADCZAQAABwAQmgEAAJICADCbAQEA-QEAIawBQACAAgAhrQFAAIACACHBAQAAjALBASPCAQEA-gEAIcMBEACNAgAhxAEQAI0CACHFAQEA-QEAIcYBIAD8AQAhxwEgAPwBACEBAAAABwAgEgMAAJMCACAHAADBAgAgCQAAwgIAIA4AAMoCACCYAQAAyAIAMJkBAAAJABCaAQAAyAIAMJsBAQD5AQAhpgEAAMkC2AEirAFAAIACACGtAUAAgAIAIcUBAQD5AQAhyAEBAPkBACHUAQEA-QEAIdUBAQD6AQAh1gFAAP8BACHYAUAA_wEAIdkBAQD6AQAhCAMAAPMDACAHAACjBAAgCQAApAQAIA4AAKYEACDVAQAAzQIAINYBAADNAgAg2AEAAM0CACDZAQAAzQIAIBIDAACTAgAgBwAAwQIAIAkAAMICACAOAADKAgAgmAEAAMgCADCZAQAACQAQmgEAAMgCADCbAQEAAAABpgEAAMkC2AEirAFAAIACACGtAUAAgAIAIcUBAQD5AQAhyAEBAPkBACHUAQEA-QEAIdUBAQD6AQAh1gFAAP8BACHYAUAA_wEAIdkBAQD6AQAhAwAAAAkAIAUAAAoAMAYAAAsAIBUHAADBAgAgCAAAkAIAIAsAAIMCACCYAQAAxQIAMJkBAAANABCaAQAAxQIAMJsBAQD5AQAhqgEgAPwBACGrAUAA_wEAIawBQACAAgAhrQFAAIACACHIAQEA-QEAIckBAQD5AQAhygEBAPoBACHLAQEA-gEAIc0BAADGAs0BIs4BEAC-AgAhzwEQAI0CACHQAQIAuAIAIdEBAgC4AgAh0wEAAMcC0wEiBwcAAKMEACAIAAD-AwAgCwAA9AMAIKsBAADNAgAgygEAAM0CACDLAQAAzQIAIM8BAADNAgAgFgcAAMECACAIAACQAgAgCwAAgwIAIJgBAADFAgAwmQEAAA0AEJoBAADFAgAwmwEBAAAAAaoBIAD8AQAhqwFAAP8BACGsAUAAgAIAIa0BQACAAgAhyAEBAPkBACHJAQEA-QEAIcoBAQD6AQAhywEBAPoBACHNAQAAxgLNASLOARAAvgIAIc8BEACNAgAh0AECALgCACHRAQIAuAIAIdMBAADHAtMBIvkBAADEAgAgAwAAAA0AIAUAAA4AMAYAAA8AIAMAAAAJACAFAAAKADAGAAALACAcAgAAjgIAIAcAAMECACAJAADCAgAgCgAAwwIAIJgBAAC8AgAwmQEAABIAEJoBAAC8AgAwmwEBAPkBACGmAQAAvQLlASKsAUAAgAIAIa0BQACAAgAhvAEBAPkBACHIAQEA-QEAIc4BEAC-AgAh1AEBAPkBACHlAQEA-QEAIecBAAC_AucBIugBAQD6AQAh6QEBAPoBACHqAQEA-gEAIesBAQD6AQAh7AEBAPoBACHtAQAAwAIAIO4BAQD6AQAh7wEQAI0CACHwAQEA-gEAIfEBAQD6AQAh8gEBAPkBACEOAgAA_AMAIAcAAKMEACAJAACkBAAgCgAApQQAIOgBAADNAgAg6QEAAM0CACDqAQAAzQIAIOsBAADNAgAg7AEAAM0CACDtAQAAzQIAIO4BAADNAgAg7wEAAM0CACDwAQAAzQIAIPEBAADNAgAgHAIAAI4CACAHAADBAgAgCQAAwgIAIAoAAMMCACCYAQAAvAIAMJkBAAASABCaAQAAvAIAMJsBAQAAAAGmAQAAvQLlASKsAUAAgAIAIa0BQACAAgAhvAEBAPkBACHIAQEA-QEAIc4BEAC-AgAh1AEBAPkBACHlAQEA-QEAIecBAAC_AucBIugBAQAAAAHpAQEAAAAB6gEBAPoBACHrAQEA-gEAIewBAQD6AQAh7QEAAMACACDuAQEA-gEAIe8BEACNAgAh8AEBAPoBACHxAQEA-gEAIfIBAQAAAAEDAAAAEgAgBQAAEwAwBgAAFAAgAQAAAAkAIAEAAAASACADAAAACQAgBQAACgAwBgAACwAgAwAAABIAIAUAABMAMAYAABQAIAEAAAANACABAAAACQAgAQAAABIAIAEAAAASACABAAAACQAgAwAAABIAIAUAABMAMAYAABQAIAEAAAASACAZAQAAugIAIAgAAJACACALAACDAgAgDQAAuwIAIJgBAAC2AgAwmQEAACEAEJoBAAC2AgAwmwEBAPkBACGmAQAAuQLkASKoAQEA-QEAIakBAQD5AQAhqgEgAPwBACGrAUAA_wEAIawBQACAAgAhrQFAAIACACHKAQEA-QEAIcsBAQD6AQAh2gEBAPkBACHcAQAAtwLcASLdAQEA-QEAId4BAQD6AQAh3wEBAPoBACHgARAAjQIAIeEBEACNAgAh4gECALgCACEKAQAA8gMAIAgAAP4DACALAAD0AwAgDQAAogQAIKsBAADNAgAgywEAAM0CACDeAQAAzQIAIN8BAADNAgAg4AEAAM0CACDhAQAAzQIAIBkBAAC6AgAgCAAAkAIAIAsAAIMCACANAAC7AgAgmAEAALYCADCZAQAAIQAQmgEAALYCADCbAQEAAAABpgEAALkC5AEiqAEBAPkBACGpAQEA-QEAIaoBIAD8AQAhqwFAAP8BACGsAUAAgAIAIa0BQACAAgAhygEBAPkBACHLAQEA-gEAIdoBAQD5AQAh3AEAALcC3AEi3QEBAPkBACHeAQEA-gEAId8BAQD6AQAh4AEQAI0CACHhARAAjQIAIeIBAgC4AgAhAwAAACEAIAUAACIAMAYAACMAIAEAAAAhACABAAAAAQAgBAIAAPwDACAPAAChBAAgvQEAAM0CACDdAQAAzQIAIAMAAAADACAFAAAnADAGAAABACADAAAAAwAgBQAAJwAwBgAAAQAgAwAAAAMAIAUAACcAMAYAAAEAIAgCAACgBAAgDwAA7gMAIJsBAQAAAAGsAUAAAAABrQFAAAAAAbwBAQAAAAG9AQEAAAAB3QEBAAAAAQEVAAArACAGmwEBAAAAAawBQAAAAAGtAUAAAAABvAEBAAAAAb0BAQAAAAHdAQEAAAABARUAAC0AMAEVAAAtADAIAgAAnwQAIA8AAKADACCbAQEA0QIAIawBQADYAgAhrQFAANgCACG8AQEA0QIAIb0BAQDSAgAh3QEBANICACECAAAAAQAgFQAAMAAgBpsBAQDRAgAhrAFAANgCACGtAUAA2AIAIbwBAQDRAgAhvQEBANICACHdAQEA0gIAIQIAAAADACAVAAAyACACAAAAAwAgFQAAMgAgAwAAAAEAIBwAACsAIB0AADAAIAEAAAABACABAAAAAwAgBQwAAJwEACAiAACeBAAgIwAAnQQAIL0BAADNAgAg3QEAAM0CACAJmAEAALUCADCZAQAAOQAQmgEAALUCADCbAQEA3gEAIawBQADlAQAhrQFAAOUBACG8AQEA3gEAIb0BAQDfAQAh3QEBAN8BACEDAAAAAwAgBQAAOAAwIQAAOQAgAwAAAAMAIAUAACcAMAYAAAEAIAEAAAAUACABAAAAFAAgAwAAABIAIAUAABMAMAYAABQAIAMAAAASACAFAAATADAGAAAUACADAAAAEgAgBQAAEwAwBgAAFAAgGQIAAI8DACAHAADvAgAgCQAA8AIAIAoAAPECACCbAQEAAAABpgEAAADlAQKsAUAAAAABrQFAAAAAAbwBAQAAAAHIAQEAAAABzgEQAAAAAdQBAQAAAAHlAQEAAAAB5wEAAADnAQLoAQEAAAAB6QEBAAAAAeoBAQAAAAHrAQEAAAAB7AEBAAAAAe0BgAAAAAHuAQEAAAAB7wEQAAAAAfABAQAAAAHxAQEAAAAB8gEBAAAAAQEVAABBACAVmwEBAAAAAaYBAAAA5QECrAFAAAAAAa0BQAAAAAG8AQEAAAAByAEBAAAAAc4BEAAAAAHUAQEAAAAB5QEBAAAAAecBAAAA5wEC6AEBAAAAAekBAQAAAAHqAQEAAAAB6wEBAAAAAewBAQAAAAHtAYAAAAAB7gEBAAAAAe8BEAAAAAHwAQEAAAAB8QEBAAAAAfIBAQAAAAEBFQAAQwAwARUAAEMAMBkCAACOAwAgBwAA6wIAIAkAAOwCACAKAADtAgAgmwEBANECACGmAQAA5gLlASKsAUAA2AIAIa0BQADYAgAhvAEBANECACHIAQEA0QIAIc4BEADnAgAh1AEBANECACHlAQEA0QIAIecBAADoAucBIugBAQDSAgAh6QEBANICACHqAQEA0gIAIesBAQDSAgAh7AEBANICACHtAYAAAAAB7gEBANICACHvARAA6QIAIfABAQDSAgAh8QEBANICACHyAQEA0QIAIQIAAAAUACAVAABGACAVmwEBANECACGmAQAA5gLlASKsAUAA2AIAIa0BQADYAgAhvAEBANECACHIAQEA0QIAIc4BEADnAgAh1AEBANECACHlAQEA0QIAIecBAADoAucBIugBAQDSAgAh6QEBANICACHqAQEA0gIAIesBAQDSAgAh7AEBANICACHtAYAAAAAB7gEBANICACHvARAA6QIAIfABAQDSAgAh8QEBANICACHyAQEA0QIAIQIAAAASACAVAABIACACAAAAEgAgFQAASAAgAwAAABQAIBwAAEEAIB0AAEYAIAEAAAAUACABAAAAEgAgDwwAAJcEACAiAACaBAAgIwAAmQQAIDQAAJgEACA1AACbBAAg6AEAAM0CACDpAQAAzQIAIOoBAADNAgAg6wEAAM0CACDsAQAAzQIAIO0BAADNAgAg7gEAAM0CACDvAQAAzQIAIPABAADNAgAg8QEAAM0CACAYmAEAAKwCADCZAQAATwAQmgEAAKwCADCbAQEA3gEAIaYBAACtAuUBIqwBQADlAQAhrQFAAOUBACG8AQEA3gEAIcgBAQDeAQAhzgEQAJYCACHUAQEA3gEAIeUBAQDeAQAh5wEAAK4C5wEi6AEBAN8BACHpAQEA3wEAIeoBAQDfAQAh6wEBAN8BACHsAQEA3wEAIe0BAACvAgAg7gEBAN8BACHvARAAhgIAIfABAQDfAQAh8QEBAN8BACHyAQEA3gEAIQMAAAASACAFAABOADAhAABPACADA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_AEAIccBIAD8AQAhAQAAAJQBACABAAAAlAEAIAUDAADzAwAgwQEAAM0CACDCAQAAzQIAIMMBAADNAgAgxAEAAM0CACADAAAABwAgBQAAlwEAMAYAAJQBACADAAAABwAgBQAAlwEAMAYAAJQBACADAAAABwAgBQAAlwEAMAYAAJQBACALAwAAhQQAIJsBAQAAAAGsAUAAAAABrQFAAAAAAcEBAAAAwQEDwgEBAAAAAcMBEAAAAAHEARAAAAABxQEBAAAAAcYBIAAAAAHHASAAAAABARUAAJsBACAKmwEBAAAAAawBQAAAAAGtAUAAAAABwQEAAADBAQPCAQEAAAABwwEQAAAAAcQBEAAAAAHFAQEAAAABxgEgAAAAAccBIAAAAAEBFQAAnQEAMAEVAACdAQAwCwMAAIQEACCbAQEA0QIAIawBQADYAgAhrQFAANgCACHBAQAA9wLBASPCAQEA0gIAIcMBEADpAgAhxAEQAOkCACHFAQEA0QIAIcYBIADUAgAhxwEgANQCACECAAAAlAEAIBUAAKABACAKmwEBANECACGsAUAA2AIAIa0BQADYAgAhwQEAAPcCwQEjwgEBANICACHDARAA6QIAIcQBEADpAgAhxQEBANECACHGASAA1AIAIccBIADUAgAhAgAAAAcAIBUAAKIBACACAAAABwAgFQAAogEAIAMAAACUAQAgHAAAmwEAIB0AAKABACABAAAAlAEAIAEAAAAHACAJDAAA_wMAICIAAIIEACAjAACBBAAgNAAAgAQAIDUAAIMEACDBAQAAzQIAIMIBAADNAgAgwwEAAM0CACDEAQAAzQIAIA2YAQAAkQIAMJkBAACpAQAQmgEAAJECADCbAQEA3gEAIawBQADlAQAhrQFAAOUBACHBAQAAhQLBASPCAQEA3wEAIcMBEACGAgAhxAEQAIYCACHFAQEA3gEAIcYBIADhAQAhxwEgAOEBACEDAAAABwAgBQAAqAEAMCEAAKkBACADAAAABwAgBQAAlwEAMAYAAJQBACATAgAAjgIAIAQAAI8CACAIAACQAgAgmAEAAIsCADCZAQAABQAQmgEAAIsCADCbAQEAAAABqgEgAPwBACGrAUAA_wEAIawBQACAAgAhrQFAAIACACG8AQEAAAABvQEBAPoBACG-AQEA-gEAIb8BAQD6AQAhwQEAAIwCwQEjwgEBAPoBACHDARAAjQIAIcQBEACNAgAhAQAAAKwBACABAAAArAEAIAsCAAD8AwAgBAAA_QMAIAgAAP4DACCrAQAAzQIAIL0BAADNAgAgvgEAAM0CACC_AQAAzQIAIMEBAADNAgAgwgEAAM0CACDDAQAAzQIAIMQBAADNAgAgAwAAAAUAIAUAAK8BADAGAACsAQAgAwAAAAUAIAUAAK8BADAGAACsAQAgAwAAAAUAIAUAAK8BADAGAACsAQAgEAIAAPsDACAEAACZAwAgCAAAmgMAIJsBAQAAAAGqASAAAAABqwFAAAAAAawBQAAAAAGtAUAAAAABvAEBAAAAAb0BAQAAAAG-AQEAAAABvwEBAAAAAcEBAAAAwQEDwgEBAAAAAcMBEAAAAAHEARAAAAABARUAALMBACANmwEBAAAAAaoBIAAAAAGrAUAAAAABrAFAAAAAAa0BQAAAAAG8AQEAAAABvQEBAAAAAb4BAQAAAAG_AQEAAAABwQEAAADBAQPCAQEAAAABwwEQAAAAAcQBEAAAAAEBFQAAtQEAMAEVAAC1AQAwEAIAAPoDACAEAAD4AgAgCAAA-QIAIJsBAQDRAgAhqgEgANQCACGrAUAA1wIAIawBQADYAgAhrQFAANgCACG8AQEA0QIAIb0BAQDSAgAhvgEBANICACG_AQEA0gIAIcEBAAD3AsEBI8IBAQDSAgAhwwEQAOkCACHEARAA6QIAIQIAAACsAQAgFQAAuAEAIA2bAQEA0QIAIaoBIADUAgAhqwFAANcCACGsAUAA2AIAIa0BQADYAgAhvAEBANECACG9AQEA0gIAIb4BAQDSAgAhvwEBANICACHBAQAA9wLBASPCAQEA0gIAIcMBEADpAgAhxAEQAOkCACECAAAABQAgFQAAugEAIAIAAAAFACAVAAC6AQAgAwAAAKwBACAcAACzAQAgHQAAuAEAIAEAAACsAQAgAQAAAAUAIA0MAAD1AwAgIgAA-AMAICMAAPcDACA0AAD2AwAgNQAA-QMAIKsBAADNAgAgvQEAAM0CACC-AQAAzQIAIL8BAADNAgAgwQEAAM0CACDCAQAAzQIAIMMBAADNAgAgxAEAAM0CACAQmAEAAIQCADCZAQAAwQEAEJoBAACEAgAwmwEBAN4BACGqASAA4QEAIasBQADkAQAhrAFAAOUBACGtAUAA5QEAIbwBAQDeAQAhvQEBAN8BACG-AQEA3wEAIb8BAQDfAQAhwQEAAIUCwQEjwgEBAN8BACHDARAAhgIAIcQBEACGAgAhAwAAAAUAIAUAAMABADAhAADBAQAgAwAAAAUAIAUAAK8BADAGAACsAQAgFgEAAIECACADAACCAgAgCwAAgwIAIJgBAAD4AQAwmQEAAMcBABCaAQAA-AEAMJsBAQAAAAGcAQEA-QEAIZ0BAQAAAAGeAQEA-gEAIZ8BAQAAAAGhAQAA-wGhASKiASAA_AEAIaQBAAD9AaQBIqYBAAD-AaYBIqcBIAD8AQAhqAEBAPkBACGpAQEA-QEAIaoBIAD8AQAhqwFAAP8BACGsAUAAgAIAIa0BQACAAgAhAQAAAMQBACABAAAAxAEAIBYBAACBAgAgAwAAggIAIAsAAIMCACCYAQAA-AEAMJkBAADHAQAQmgEAAPgBADCbAQEA-QEAIZwBAQD5AQAhnQEBAPkBACGeAQEA-gEAIZ8BAQD6AQAhoQEAAPsBoQEiogEgAPwBACGkAQAA_QGkASKmAQAA_gGmASKnASAA_AEAIagBAQD5AQAhqQEBAPkBACGqASAA_AEAIasBQAD_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-AEAMJkBAADHAQAQmgEAAPgBADCbAQEA-QEAIZwBAQD5AQAhnQEBAPkBACGeAQEA-gEAIZ8BAQD6AQAhoQEAAPsBoQEiogEgAPwBACGkAQAA_QGkASKmAQAA_gGmASKnASAA_AEAIagBAQD5AQAhqQEBAPkBACGqASAA_AEAIasBQAD_AQAhrAFAAIACACGtAUAAgAIAIQuuAQEAAAABrwEBAAAABLABAQAAAASxAQEAAAABsgEBAAAAAbMBAQAAAAG0AQEAAAABtQEBAPcBACG2AQEAAAABtwEBAAAAAbgBAQAAAAELrgEBAAAAAa8BAQAAAAWwAQEAAAAFsQEBAAAAAbIBAQAAAAGzAQEAAAABtAEBAAAAAbUBAQD1AQAhtgEBAAAAAbcBAQAAAAG4AQEAAAABBK4BAAAAoQECrwEAAAChAQiwAQAAAKEBCLUBAADzAaEBIgKuASAAAAABtQEgAPEBACEErgEAAACkAQKvAQAAAKQBCLABAAAApAEItQEAAO8BpAEiBK4BAAAApgECrwEAAACmAQiwAQAAAKYBCLUBAADtAaYBIgiuAUAAAAABrwFAAAAABbABQAAAAAWxAUAAAAABsgFAAAAAAbMBQAAAAAG0AUAAAAABtQFAAOsBACEIrgFAAAAAAa8BQAAAAASwAUAAAAAEsQFAAAAAAbIBQAAAAAGzAUAAAAABtAFAAAAAAbUBQADoAQAhDQIAAI4CACAPAADMAgAgmAEAAMsCADCZAQAAAwAQmgEAAMsCADCbAQEA-QEAIawBQACAAgAhrQFAAIACACG8AQEA-QEAIb0BAQD6AQAh3QEBAPoBACH6AQAAAwAg-wEAAAMAIBUCAACOAgAgBAAAjwIAIAgAAJACACCYAQAAiwIAMJkBAAAFABCaAQAAiwIAMJsBAQD5AQAhqgEgAPwBACGrAUAA_wEAIawBQACAAgAhrQFAAIACACG8AQEA-QEAIb0BAQD6AQAhvgEBAPoBACG_AQEA-gEAIcEBAACMAsEBI8IBAQD6AQAhwwEQAI0CACHEARAAjQIAIfoBAAAFACD7AQAABQAgA7kBAAASACC6AQAAEgAguwEAABIAIBCYAQAAhAIAMJkBAADBAQAQmgEAAIQCADCbAQEA3gEAIaoBIADhAQAhqwFAAOQBACGsAUAA5QEAIa0BQADlAQAhvAEBAN4BACG9AQEA3wEAIb4BAQDfAQAhvwEBAN8BACHBAQAAhQLBASPCAQEA3wEAIcMBEACGAgAhxAEQAIYCACEHDAAA6gEAICIAAIoCACAjAACKAgAgrgEAAADBAQOvAQAAAMEBCbABAAAAwQEJtQEAAIkCwQEjDQwAAOoBACAiAACIAgAgIwAAiAIAIDQAAIgCACA1AACIAgAgrgEQAAAAAa8BEAAAAAWwARAAAAAFsQEQAAAAAbIBEAAAAAGzARAAAAABtAEQAAAAAbUBEACHAgAhDQwAAOoBACAiAACIAgAgIwAAiAIAIDQAAIgCACA1AACIAgAgrgEQAAAAAa8BEAAAAAWwARAAAAAFsQEQAAAAAbIBEAAAAAGzARAAAAABtAEQAAAAAbUBEACHAgAhCK4BEAAAAAGvARAAAAAFsAEQAAAABbEBEAAAAAGyARAAAAABswEQAAAAAbQBEAAAAAG1ARAAiAIAIQcMAADqAQAgIgAAigIAICMAAIoCACCuAQAAAMEBA68BAAAAwQEJsAEAAADBAQm1AQAAiQLBASMErgEAAADBAQOvAQAAAMEBCbABAAAAwQEJtQEAAIoCwQEjEwIAAI4CACAEAACPAgAgCAAAkAIAIJgBAACLAgAwmQEAAAUAEJoBAACLAgAwmwEBAPkBACGqASAA_AEAIasBQAD_AQAhrAFAAIACACGtAUAAgAIAIbwBAQD5AQAhvQEBAPoBACG-AQEA-gEAIb8BAQD6AQAhwQEAAIwCwQEjwgEBAPoBACHDARAAjQIAIcQBEACNAgAhBK4BAAAAwQEDrwEAAADBAQmwAQAAAMEBCbUBAACKAsEBIwiuARAAAAABrwEQAAAABbABEAAAAAWxARAAAAABsgEQAAAAAbMBEAAAAAG0ARAAAAABtQEQAIgCACEYAQAAgQIAIAMAAIICACALAACDAgAgmAEAAPgBADCZAQAAxwEAEJoBAAD4AQAwmwEBAPkBACGcAQEA-QEAIZ0BAQD5AQAhngEBAPoBACGfAQEA-gEAIaEBAAD7AaEBIqIBIAD8AQAhpAEAAP0BpAEipgEAAP4BpgEipwEgAPwBACGoAQEA-QEAIakBAQD5AQAhqgEgAPwBACGrAUAA_wEAIawBQACAAgAhrQFAAIACACH6AQAAxwEAIPsBAADHAQAgEAMAAJMCACCYAQAAkgIAMJkBAAAHABCaAQAAkgIAMJsBAQD5AQAhrAFAAIACACGtAUAAgAIAIcEBAACMAsEBI8IBAQD6AQAhwwEQAI0CACHEARAAjQIAIcUBAQD5AQAhxgEgAPwBACHHASAA_AEAIfoBAAAHACD7AQAABwAgA7kBAAAJACC6AQAACQAguwEAAAkAIA2YAQAAkQIAMJkBAACpAQAQmgEAAJECADCbAQEA3gEAIawBQADlAQAhrQFAAOUBACHBAQAAhQLBASPCAQEA3wEAIcMBEACGAgAhxAEQAIYCACHFAQEA3gEAIcYBIADhAQAhxwEgAOEBACEOAwAAkwIAIJgBAACSAgAwmQEAAAcAEJoBAACSAgAwmwEBAPkBACGsAUAAgAIAIa0BQACAAgAhwQEAAIwCwQEjwgEBAPoBACHDARAAjQIAIcQBEACNAgAhxQEBAPkBACHGASAA_AEAIccBIAD8AQAhFQIAAI4CACAEAACPAgAgCAAAkAIAIJgBAACLAgAwmQEAAAUAEJoBAACLAgAwmwEBAPkBACGqASAA_AEAIasBQAD_AQAhrAFAAIACACGtAUAAgAIAIbwBAQD5AQAhvQEBAPoBACG-AQEA-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-QEAIawBQACAAgAhrQFAAIACACG8AQEA-QEAIb0BAQD6AQAh3QEBAPoBACH6AQAAAwAg-wEAAAMAIAO5AQAADQAgugEAAA0AILsBAAANACAcAgAAjgIAIAcAAMECACAJAADCAgAgCgAAwwIAIJgBAAC8AgAwmQEAABIAEJoBAAC8AgAwmwEBAPkBACGmAQAAvQLlASKsAUAAgAIAIa0BQACAAgAhvAEBAPkBACHIAQEA-QEAIc4BEAC-AgAh1AEBAPkBACHlAQEA-QEAIecBAAC_AucBIugBAQD6AQAh6QEBAPoBACHqAQEA-gEAIesBAQD6AQAh7AEBAPoBACHtAQAAwAIAIO4BAQD6AQAh7wEQAI0CACHwAQEA-gEAIfEBAQD6AQAh8gEBAPkBACEErgEAAADlAQKvAQAAAOUBCLABAAAA5QEItQEAALQC5QEiCK4BEAAAAAGvARAAAAAEsAEQAAAABLEBEAAAAAGyARAAAAABswEQAAAAAbQBEAAAAAG1ARAAngIAIQSuAQAAAOcBAq8BAAAA5wEIsAEAAADnAQi1AQAAsgLnASIMrgGAAAAAAbEBgAAAAAGyAYAAAAABswGAAAAAAbQBgAAAAAG1AYAAAAAB8wEBAAAAAfQBAQAAAAH1AQEAAAAB9gGAAAAAAfcBgAAAAAH4AYAAAAABGwEAALoCACAIAACQAgAgCwAAgwIAIA0AALsCACCYAQAAtgIAMJkBAAAhABCaAQAAtgIAMJsBAQD5AQAhpgEAALkC5AEiqAEBAPkBACGpAQEA-QEAIaoBIAD8AQAhqwFAAP8BACGsAUAAgAIAIa0BQACAAgAhygEBAPkBACHLAQEA-gEAIdoBAQD5AQAh3AEAALcC3AEi3QEBAPkBACHeAQEA-gEAId8BAQD6AQAh4AEQAI0CACHhARAAjQIAIeIBAgC4AgAh-gEAACEAIPsBAAAhACAXBwAAwQIAIAgAAJACACALAACDAgAgmAEAAMUCADCZAQAADQAQmgEAAMUCADCbAQEA-QEAIaoBIAD8AQAhqwFAAP8BACGsAUAAgAIAIa0BQACAAgAhyAEBAPkBACHJAQEA-QEAIcoBAQD6AQAhywEBAPoBACHNAQAAxgLNASLOARAAvgIAIc8BEACNAgAh0AECALgCACHRAQIAuAIAIdMBAADHAtMBIvoBAAANACD7AQAADQAgFAMAAJMCACAHAADBAgAgCQAAwgIAIA4AAMoCACCYAQAAyAIAMJkBAAAJABCaAQAAyAIAMJsBAQD5AQAhpgEAAMkC2AEirAFAAIACACGtAUAAgAIAIcUBAQD5AQAhyAEBAPkBACHUAQEA-QEAIdUBAQD6AQAh1gFAAP8BACHYAUAA_wEAIdkBAQD6AQAh-gEAAAkAIPsBAAAJACACyAEBAAAAAckBAQAAAAEVBwAAwQIAIAgAAJACACALAACDAgAgmAEAAMUCADCZAQAADQAQmgEAAMUCADCbAQEA-QEAIaoBIAD8AQAhqwFAAP8BACGsAUAAgAIAIa0BQACAAgAhyAEBAPkBACHJAQEA-QEAIcoBAQD6AQAhywEBAPoBACHNAQAAxgLNASLOARAAvgIAIc8BEACNAgAh0AECALgCACHRAQIAuAIAIdMBAADHAtMBIgSuAQAAAM0BAq8BAAAAzQEIsAEAAADNAQi1AQAAoALNASIErgEAAADTAQKvAQAAANMBCLABAAAA0wEItQEAAJoC0wEiEgMAAJMCACAHAADBAgAgCQAAwgIAIA4AAMoCACCYAQAAyAIAMJkBAAAJABCaAQAAyAIAMJsBAQD5AQAhpgEAAMkC2AEirAFAAIACACGtAUAAgAIAIcUBAQD5AQAhyAEBAPkBACHUAQEA-QEAIdUBAQD6AQAh1gFAAP8BACHYAUAA_wEAIdkBAQD6AQAhBK4BAAAA2AECrwEAAADYAQiwAQAAANgBCLUBAACkAtgBIh4CAACOAgAgBwAAwQIAIAkAAMICACAKAADDAgAgmAEAALwCADCZAQAAEgAQmgEAALwCADCbAQEA-QEAIaYBAAC9AuUBIqwBQACAAgAhrQFAAIACACG8AQEA-QEAIcgBAQD5AQAhzgEQAL4CACHUAQEA-QEAIeUBAQD5AQAh5wEAAL8C5wEi6AEBAPoBACHpAQEA-gEAIeoBAQD6AQAh6wEBAPoBACHsAQEA-gEAIe0BAADAAgAg7gEBAPoBACHvARAAjQIAIfABAQD6AQAh8QEBAPoBACHyAQEA-QEAIfoBAAASACD7AQAAEgAgCwIAAI4CACAPAADMAgAgmAEAAMsCADCZAQAAAwAQmgEAAMsCADCbAQEA-QEAIawBQACAAgAhrQFAAIACACG8AQEA-QEAIb0BAQD6AQAh3QEBAPoBACEDuQEAACEAILoBAAAhACC7AQAAIQAgAAAAAAH_AQEAAAABAf8BAQAAAAEB_wEAAAChAQIB_wEgAAAAAQH_AQAAAKQBAgH_AQAAAKYBAgH_AUAAAAABAf8BQAAAAAEHHAAAmwMAIB0AAJ4DACD8AQAAnAMAIP0BAACdAwAggAIAAAMAIIECAAADACCCAgAAAQAgBxwAAPICACAdAAD1AgAg_AEAAPMCACD9AQAA9AIAIIACAAAFACCBAgAABQAgggIAAKwBACALHAAA3AIAMB0AAOECADD8AQAA3QIAMP0BAADeAgAw_gEAAN8CACD_AQAA4AIAMIACAADgAgAwgQIAAOACADCCAgAA4AIAMIMCAADiAgAwhAIAAOMCADAXBwAA7wIAIAkAAPACACAKAADxAgAgmwEBAAAAAaYBAAAA5QECrAFAAAAAAa0BQAAAAAHIAQEAAAABzgEQAAAAAdQBAQAAAAHlAQEAAAAB5wEAAADnAQLoAQEAAAAB6QEBAAAAAeoBAQAAAAHrAQEAAAAB7AEBAAAAAe0BgAAAAAHuAQEAAAAB7wEQAAAAAfABAQAAAAHxAQEAAAAB8gEBAAAAAQIAAAAUACAcAADuAgAgAwAAABQAIBwAAO4CACAdAADqAgAgARUAAOoEADAcAgAAjgIAIAcAAMECACAJAADCAgAgCgAAwwIAIJgBAAC8AgAwmQEAABIAEJoBAAC8AgAwmwEBAAAAAaYBAAC9AuUBIqwBQACAAgAhrQFAAIACACG8AQEA-QEAIcgBAQD5AQAhzgEQAL4CACHUAQEA-QEAIeUBAQD5AQAh5wEAAL8C5wEi6AEBAAAAAekBAQAAAAHqAQEA-gEAIesBAQD6AQAh7AEBAPoBACHtAQAAwAIAIO4BAQD6AQAh7wEQAI0CACHwAQEA-gEAIfEBAQD6AQAh8gEBAAAAAQIAAAAUACAVAADqAgAgAgAAAOQCACAVAADlAgAgGJgBAADjAgAwmQEAAOQCABCaAQAA4wIAMJsBAQD5AQAhpgEAAL0C5QEirAFAAIACACGtAUAAgAIAIbwBAQD5AQAhyAEBAPkBACHOARAAvgIAIdQBAQD5AQAh5QEBAPkBACHnAQAAvwLnASLoAQEA-gEAIekBAQD6AQAh6gEBAPoBACHrAQEA-gEAIewBAQD6AQAh7QEAAMACACDuAQEA-gEAIe8BEACNAgAh8AEBAPoBACHxAQEA-gEAIfIBAQD5AQAhGJgBAADjAgAwmQEAAOQCABCaAQAA4wIAMJsBAQD5AQAhpgEAAL0C5QEirAFAAIACACGtAUAAgAIAIbwBAQD5AQAhyAEBAPkBACHOARAAvgIAIdQBAQD5AQAh5QEBAPkBACHnAQAAvwLnASLoAQEA-gEAIekBAQD6AQAh6gEBAPoBACHrAQEA-gEAIewBAQD6AQAh7QEAAMACACDuAQEA-gEAIe8BEACNAgAh8AEBAPoBACHxAQEA-gEAIfIBAQD5AQAhFJsBAQDRAgAhpgEAAOYC5QEirAFAANgCACGtAUAA2AIAIcgBAQDRAgAhzgEQAOcCACHUAQEA0QIAIeUBAQDRAgAh5wEAAOgC5wEi6AEBANICACHpAQEA0gIAIeoBAQDSAgAh6wEBANICACHsAQEA0gIAIe0BgAAAAAHuAQEA0gIAIe8BEADpAgAh8AEBANICACHxAQEA0gIAIfIBAQDRAgAhAf8BAAAA5QECBf8BEAAAAAGFAhAAAAABhgIQAAAAAYcCEAAAAAGIAhAAAAABAf8BAAAA5wECBf8BEAAAAAGFAhAAAAABhgIQAAAAAYcCEAAAAAGIAhAAAAABFwcAAOsCACAJAADsAgAgCgAA7QIAIJsBAQDRAgAhpgEAAOYC5QEirAFAANgCACGtAUAA2AIAIcgBAQDRAgAhzgEQAOcCACHUAQEA0QIAIeUBAQDRAgAh5wEAAOgC5wEi6AEBANICACHpAQEA0gIAIeoBAQDSAgAh6wEBANICACHsAQEA0gIAIe0BgAAAAAHuAQEA0gIAIe8BEADpAgAh8AEBANICACHxAQEA0gIAIfIBAQDRAgAhBRwAAN8EACAdAADoBAAg_AEAAOAEACD9AQAA5wQAIIICAAAjACAFHAAA3QQAIB0AAOUEACD8AQAA3gQAIP0BAADkBAAgggIAAA8AIAUcAADbBAAgHQAA4gQAIPwBAADcBAAg_QEAAOEEACCCAgAACwAgFwcAAO8CACAJAADwAgAgCgAA8QIAIJsBAQAAAAGmAQAAAOUBAqwBQAAAAAGtAUAAAAAByAEBAAAAAc4BEAAAAAHUAQEAAAAB5QEBAAAAAecBAAAA5wEC6AEBAAAAAekBAQAAAAHqAQEAAAAB6wEBAAAAAewBAQAAAAHtAYAAAAAB7gEBAAAAAe8BEAAAAAHwAQEAAAAB8QEBAAAAAfIBAQAAAAEDHAAA3wQAIPwBAADgBAAgggIAACMAIAMcAADdBAAg_AEAAN4EACCCAgAADwAgAxwAANsEACD8AQAA3AQAIIICAAALACAOBAAAmQMAIAgAAJoDACCbAQEAAAABqgEgAAAAAasBQAAAAAGsAUAAAAABrQFAAAAAAb0BAQAAAAG-AQEAAAABvwEBAAAAAcEBAAAAwQEDwgEBAAAAAcMBEAAAAAHEARAAAAABAgAAAKwBACAcAADyAgAgAwAAAAUAIBwAAPICACAdAAD2AgAgEAAAAAUAIAQAAPgCACAIAAD5AgAgFQAA9gIAIJsBAQDRAgAhqgEgANQCACGrAUAA1wIAIawBQADYAgAhrQFAANgCACG9AQEA0gIAIb4BAQDSAgAhvwEBANICACHBAQAA9wLBASPCAQEA0gIAIcMBEADpAgAhxAEQAOkCACEOBAAA-AIAIAgAAPkCACCbAQEA0QIAIaoBIADUAgAhqwFAANcCACGsAUAA2AIAIa0BQADYAgAhvQEBANICACG-AQEA0gIAIb8BAQDSAgAhwQEAAPcCwQEjwgEBANICACHDARAA6QIAIcQBEADpAgAhAf8BAAAAwQEDBxwAAJQDACAdAACXAwAg_AEAAJUDACD9AQAAlgMAIIACAAAHACCBAgAABwAgggIAAJQBACALHAAA-gIAMB0AAP8CADD8AQAA-wIAMP0BAAD8AgAw_gEAAP0CACD_AQAA_gIAMIACAAD-AgAwgQIAAP4CADCCAgAA_gIAMIMCAACAAwAwhAIAAIEDADANBwAAkQMAIAkAAJIDACAOAACTAwAgmwEBAAAAAaYBAAAA2AECrAFAAAAAAa0BQAAAAAHIAQEAAAAB1AEBAAAAAdUBAQAAAAHWAUAAAAAB2AFAAAAAAdkBAQAAAAECAAAACwAgHAAAkAMAIAMAAAALACAcAACQAwAgHQAAhQMAIAEVAADaBAAwEgMAAJMCACAHAADBAgAgCQAAwgIAIA4AAMoCACCYAQAAyAIAMJkBAAAJABCaAQAAyAIAMJsBAQAAAAGmAQAAyQLYASKsAUAAgAIAIa0BQACAAgAhxQEBAPkBACHIAQEA-QEAIdQBAQD5AQAh1QEBAPoBACHWAUAA_wEAIdgBQAD_AQAh2QEBAPoBACECAAAACwAgFQAAhQMAIAIAAACCAwAgFQAAgwMAIA6YAQAAgQMAMJkBAACCAwAQmgEAAIEDADCbAQEA-QEAIaYBAADJAtgBIqwBQACAAgAhrQFAAIACACHFAQEA-QEAIcgBAQD5AQAh1AEBAPkBACHVAQEA-gEAIdYBQAD_AQAh2AFAAP8BACHZAQEA-gEAIQ6YAQAAgQMAMJkBAACCAwAQmgEAAIEDADCbAQEA-QEAIaYBAADJAtgBIqwBQACAAgAhrQFAAIACACHFAQEA-QEAIcgBAQD5AQAh1AEBAPkBACHVAQEA-gEAIdYBQAD_AQAh2AFAAP8BACHZAQEA-gEAIQqbAQEA0QIAIaYBAACEA9gBIqwBQADYAgAhrQFAANgCACHIAQEA0QIAIdQBAQDRAgAh1QEBANICACHWAUAA1wIAIdgBQADXAgAh2QEBANICACEB_wEAAADYAQINBwAAhgMAIAkAAIcDACAOAACIAwAgmwEBANECACGmAQAAhAPYASKsAUAA2AIAIa0BQADYAgAhyAEBANECACHUAQEA0QIAIdUBAQDSAgAh1gFAANcCACHYAUAA1wIAIdkBAQDSAgAhBRwAAM0EACAdAADYBAAg_AEAAM4EACD9AQAA1wQAIIICAAAjACAFHAAAywQAIB0AANUEACD8AQAAzAQAIP0BAADUBAAgggIAAA8AIAccAACJAwAgHQAAjAMAIPwBAACKAwAg_QEAAIsDACCAAgAAEgAggQIAABIAIIICAAAUACAXAgAAjwMAIAcAAO8CACAJAADwAgAgmwEBAAAAAaYBAAAA5QECrAFAAAAAAa0BQAAAAAG8AQEAAAAByAEBAAAAAc4BEAAAAAHUAQEAAAAB5QEBAAAAAecBAAAA5wEC6AEBAAAAAekBAQAAAAHqAQEAAAAB6wEBAAAAAewBAQAAAAHtAYAAAAAB7gEBAAAAAe8BEAAAAAHwAQEAAAAB8QEBAAAAAQIAAAAUACAcAACJAwAgAwAAABIAIBwAAIkDACAdAACNAwAgGQAAABIAIAIAAI4DACAHAADrAgAgCQAA7AIAIBUAAI0DACCbAQEA0QIAIaYBAADmAuUBIqwBQADYAgAhrQFAANgCACG8AQEA0QIAIcgBAQDRAgAhzgEQAOcCACHUAQEA0QIAIeUBAQDRAgAh5wEAAOgC5wEi6AEBANICACHpAQEA0gIAIeoBAQDSAgAh6wEBANICACHsAQEA0gIAIe0BgAAAAAHuAQEA0gIAIe8BEADpAgAh8AEBANICACHxAQEA0gIAIRcCAACOAwAgBwAA6wIAIAkAAOwCACCbAQEA0QIAIaYBAADmAuUBIqwBQADYAgAhrQFAANgCACG8AQEA0QIAIcgBAQDRAgAhzgEQAOcCACHUAQEA0QIAIeUBAQDRAgAh5wEAAOgC5wEi6AEBANICACHpAQEA0gIAIeoBAQDSAgAh6wEBANICACHsAQEA0gIAIe0BgAAAAAHuAQEA0gIAIe8BEADpAgAh8AEBANICACHxAQEA0gIAIQUcAADPBAAgHQAA0gQAIPwBAADQBAAg_QEAANEEACCCAgAAxAEAIAMcAADPBAAg_AEAANAEACCCAgAAxAEAIA0HAACRAwAgCQAAkgMAIA4AAJMDACCbAQEAAAABpgEAAADYAQKsAUAAAAABrQFAAAAAAcgBAQAAAAHUAQEAAAAB1QEBAAAAAdYBQAAAAAHYAUAAAAAB2QEBAAAAAQMcAADNBAAg_AEAAM4EACCCAgAAIwAgAxwAAMsEACD8AQAAzAQAIIICAAAPACADHAAAiQMAIPwBAACKAwAgggIAABQAIAmbAQEAAAABrAFAAAAAAa0BQAAAAAHBAQAAAMEBA8IBAQAAAAHDARAAAAABxAEQAAAAAcYBIAAAAAHHASAAAAABAgAAAJQBACAcAACUAwAgAwAAAAcAIBwAAJQDACAdAACYAwAgCwAAAAcAIBUAAJgDACCbAQEA0QIAIawBQADYAgAhrQFAANgCACHBAQAA9wLBASPCAQEA0gIAIcMBEADpAgAhxAEQAOkCACHGASAA1AIAIccBIADUAgAhCZsBAQDRAgAhrAFAANgCACGtAUAA2AIAIcEBAAD3AsEBI8IBAQDSAgAhwwEQAOkCACHEARAA6QIAIcYBIADUAgAhxwEgANQCACEDHAAAlAMAIPwBAACVAwAgggIAAJQBACAEHAAA-gIAMPwBAAD7AgAw_gEAAP0CACCCAgAA_gIAMAYPAADuAwAgmwEBAAAAAawBQAAAAAGtAUAAAAABvQEBAAAAAd0BAQAAAAECAAAAAQAgHAAAmwMAIAMAAAADACAcAACbAwAgHQAAnwMAIAgAAAADACAPAACgAwAgFQAAnwMAIJsBAQDRAgAhrAFAANgCACGtAUAA2AIAIb0BAQDSAgAh3QEBANICACEGDwAAoAMAIJsBAQDRAgAhrAFAANgCACGtAUAA2AIAIb0BAQDSAgAh3QEBANICACELHAAAoQMAMB0AAKYDADD8AQAAogMAMP0BAACjAwAw_gEAAKQDACD_AQAApQMAMIACAAClAwAwgQIAAKUDADCCAgAApQMAMIMCAACnAwAwhAIAAKgDADAUCAAA7AMAIAsAAO0DACANAADrAwAgmwEBAAAAAaYBAAAA5AECqAEBAAAAAakBAQAAAAGqASAAAAABqwFAAAAAAawBQAAAAAGtAUAAAAABygEBAAAAAcsBAQAAAAHcAQAAANwBAt0BAQAAAAHeAQEAAAAB3wEBAAAAAeABEAAAAAHhARAAAAAB4gECAAAAAQIAAAAjACAcAADqAwAgAwAAACMAIBwAAOoDACAdAACuAwAgARUAAMoEADAZAQAAugIAIAgAAJACACALAACDAgAgDQAAuwIAIJgBAAC2AgAwmQEAACEAEJoBAAC2AgAwmwEBAAAAAaYBAAC5AuQBIqgBAQD5AQAhqQEBAPkBACGqASAA_AEAIasBQAD_AQAhrAFAAIACACGtAUAAgAIAIcoBAQD5AQAhywEBAPoBACHaAQEA-QEAIdwBAAC3AtwBIt0BAQD5AQAh3gEBAPoBACHfAQEA-gEAIeABEACNAgAh4QEQAI0CACHiAQIAuAIAIQIAAAAjACAVAACuAwAgAgAAAKkDACAVAACqAwAgFZgBAACoAwAwmQEAAKkDABCaAQAAqAMAMJsBAQD5AQAhpgEAALkC5AEiqAEBAPkBACGpAQEA-QEAIaoBIAD8AQAhqwFAAP8BACGsAUAAgAIAIa0BQACAAgAhygEBAPkBACHLAQEA-gEAIdoBAQD5AQAh3AEAALcC3AEi3QEBAPkBACHeAQEA-gEAId8BAQD6AQAh4AEQAI0CACHhARAAjQIAIeIBAgC4AgAhFZgBAACoAwAwmQEAAKkDABCaAQAAqAMAMJsBAQD5AQAhpgEAALkC5AEiqAEBAPkBACGpAQEA-QEAIaoBIAD8AQAhqwFAAP8BACGsAUAAgAIAIa0BQACAAgAhygEBAPkBACHLAQEA-gEAIdoBAQD5AQAh3AEAALcC3AEi3QEBAPkBACHeAQEA-gEAId8BAQD6AQAh4AEQAI0CACHhARAAjQIAIeIBAgC4AgAhEZsBAQDRAgAhpgEAAK0D5AEiqAEBANECACGpAQEA0QIAIaoBIADUAgAhqwFAANcCACGsAUAA2AIAIa0BQADYAgAhygEBANECACHLAQEA0gIAIdwBAACrA9wBIt0BAQDRAgAh3gEBANICACHfAQEA0gIAIeABEADpAgAh4QEQAOkCACHiAQIArAMAIQH_AQAAANwBAgX_AQIAAAABhQICAAAAAYYCAgAAAAGHAgIAAAABiAICAAAAAQH_AQAAAOQBAhQIAACwAwAgCwAAsQMAIA0AAK8DACCbAQEA0QIAIaYBAACtA-QBIqgBAQDRAgAhqQEBANECACGqASAA1AIAIasBQADXAgAhrAFAANgCACGtAUAA2AIAIcoBAQDRAgAhywEBANICACHcAQAAqwPcASLdAQEA0QIAId4BAQDSAgAh3wEBANICACHgARAA6QIAIeEBEADpAgAh4gECAKwDACELHAAAxgMAMB0AAMsDADD8AQAAxwMAMP0BAADIAwAw_gEAAMkDACD_AQAAygMAMIACAADKAwAwgQIAAMoDADCCAgAAygMAMIMCAADMAwAwhAIAAM0DADALHAAAuwMAMB0AAL8DADD8AQAAvAMAMP0BAAC9AwAw_gEAAL4DACD_AQAA_gIAMIACAAD-AgAwgQIAAP4CADCCAgAA_gIAMIMCAADAAwAwhAIAAIEDADALHAAAsgMAMB0AALYDADD8AQAAswMAMP0BAAC0AwAw_gEAALUDACD_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_AEAIasBQAD_AQAhrAFAAIACACGtAUAAgAIAIcgBAQD5AQAhyQEBAPkBACHKAQEA-gEAIcsBAQD6AQAhzQEAAMYCzQEizgEQAL4CACHPARAAjQIAIdABAgC4AgAh0QECALgCACHTAQAAxwLTASL5AQAAxAIAIAIAAAAPACAVAADSAwAgAgAAAM4DACAVAADPAwAgEpgBAADNAwAwmQEAAM4DABCaAQAAzQMAMJsBAQD5AQAhqgEgAPwBACGrAUAA_wEAIawBQACAAgAhrQFAAIACACHIAQEA-QEAIckBAQD5AQAhygEBAPoBACHLAQEA-gEAIc0BAADGAs0BIs4BEAC-AgAhzwEQAI0CACHQAQIAuAIAIdEBAgC4AgAh0wEAAMcC0wEiEpgBAADNAwAwmQEAAM4DABCaAQAAzQMAMJsBAQD5AQAhqgEgAPwBACGrAUAA_wEAIawBQACAAgAhrQFAAIACACHIAQEA-QEAIckBAQD5AQAhygEBAPoBACHLAQEA-gEAIc0BAADGAs0BIs4BEAC-AgAhzwEQAI0CACHQAQIAuAIAIdEBAgC4AgAh0wEAAMcC0wEiDpsBAQDRAgAhqgEgANQCACGrAUAA1wIAIawBQADYAgAhrQFAANgCACHJAQEA0QIAIcoBAQDSAgAhywEBANICACHNAQAA0APNASLOARAA5wIAIc8BEADpAgAh0AECAKwDACHRAQIArAMAIdMBAADRA9MBIgH_AQAAAM0BAgH_AQAAANMBAhAIAADTAwAgCwAA1AMAIJsBAQDRAgAhqgEgANQCACGrAUAA1wIAIawBQADYAgAhrQFAANgCACHJAQEA0QIAIcoBAQDSAgAhywEBANICACHNAQAA0APNASLOARAA5wIAIc8BEADpAgAh0AECAKwDACHRAQIArAMAIdMBAADRA9MBIgscAADeAwAwHQAA4gMAMPwBAADfAwAw_QEAAOADADD-AQAA4QMAIP8BAAD-AgAwgAIAAP4CADCBAgAA_gIAMIICAAD-AgAwgwIAAOMDADCEAgAAgQMAMAscAADVAwAwHQAA2QMAMPwBAADWAwAw_QEAANcDADD-AQAA2AMAIP8BAADgAgAwgAIAAOACADCBAgAA4AIAMIICAADgAgAwgwIAANoDADCEAgAA4wIAMBcCAACPAwAgBwAA7wIAIAoAAPECACCbAQEAAAABpgEAAADlAQKsAUAAAAABrQFAAAAAAbwBAQAAAAHIAQEAAAABzgEQAAAAAeUBAQAAAAHnAQAAAOcBAugBAQAAAAHpAQEAAAAB6gEBAAAAAesBAQAAAAHsAQEAAAAB7QGAAAAAAe4BAQAAAAHvARAAAAAB8AEBAAAAAfEBAQAAAAHyAQEAAAABAgAAABQAIBwAAN0DACADAAAAFAAgHAAA3QMAIB0AANwDACABFQAAwQQAMAIAAAAUACAVAADcAwAgAgAAAOQCACAVAADbAwAgFJsBAQDRAgAhpgEAAOYC5QEirAFAANgCACGtAUAA2AIAIbwBAQDRAgAhyAEBANECACHOARAA5wIAIeUBAQDRAgAh5wEAAOgC5wEi6AEBANICACHpAQEA0gIAIeoBAQDSAgAh6wEBANICACHsAQEA0gIAIe0BgAAAAAHuAQEA0gIAIe8BEADpAgAh8AEBANICACHxAQEA0gIAIfIBAQDRAgAhFwIAAI4DACAHAADrAgAgCgAA7QIAIJsBAQDRAgAhpgEAAOYC5QEirAFAANgCACGtAUAA2AIAIbwBAQDRAgAhyAEBANECACHOARAA5wIAIeUBAQDRAgAh5wEAAOgC5wEi6AEBANICACHpAQEA0gIAIeoBAQDSAgAh6wEBANICACHsAQEA0gIAIe0BgAAAAAHuAQEA0gIAIe8BEADpAgAh8AEBANICACHxAQEA0gIAIfIBAQDRAgAhFwIAAI8DACAHAADvAgAgCgAA8QIAIJsBAQAAAAGmAQAAAOUBAqwBQAAAAAGtAUAAAAABvAEBAAAAAcgBAQAAAAHOARAAAAAB5QEBAAAAAecBAAAA5wEC6AEBAAAAAekBAQAAAAHqAQEAAAAB6wEBAAAAAewBAQAAAAHtAYAAAAAB7gEBAAAAAe8BEAAAAAHwAQEAAAAB8QEBAAAAAfIBAQAAAAENAwAAxQMAIAcAAJEDACAOAACTAwAgmwEBAAAAAaYBAAAA2AECrAFAAAAAAa0BQAAAAAHFAQEAAAAByAEBAAAAAdUBAQAAAAHWAUAAAAAB2AFAAAAAAdkBAQAAAAECAAAACwAgHAAA5gMAIAMAAAALACAcAADmAwAgHQAA5QMAIAEVAADABAAwAgAAAAsAIBUAAOUDACACAAAAggMAIBUAAOQDACAKmwEBANECACGmAQAAhAPYASKsAUAA2AIAIa0BQADYAgAhxQEBANECACHIAQEA0QIAIdUBAQDSAgAh1gFAANcCACHYAUAA1wIAIdkBAQDSAgAhDQMAAMMDACAHAACGAwAgDgAAiAMAIJsBAQDRAgAhpgEAAIQD2AEirAFAANgCACGtAUAA2AIAIcUBAQDRAgAhyAEBANECACHVAQEA0gIAIdYBQADXAgAh2AFAANcCACHZAQEA0gIAIQ0DAADFAwAgBwAAkQMAIA4AAJMDACCbAQEAAAABpgEAAADYAQKsAUAAAAABrQFAAAAAAcUBAQAAAAHIAQEAAAAB1QEBAAAAAdYBQAAAAAHYAUAAAAAB2QEBAAAAARAIAADoAwAgCwAA6QMAIJsBAQAAAAGqASAAAAABqwFAAAAAAawBQAAAAAGtAUAAAAAByQEBAAAAAcoBAQAAAAHLAQEAAAABzQEAAADNAQLOARAAAAABzwEQAAAAAdABAgAAAAHRAQIAAAAB0wEAAADTAQIEHAAA3gMAMPwBAADfAwAw_gEAAOEDACCCAgAA_gIAMAQcAADVAwAw_AEAANYDADD-AQAA2AMAIIICAADgAgAwFAgAAOwDACALAADtAwAgDQAA6wMAIJsBAQAAAAGmAQAAAOQBAqgBAQAAAAGpAQEAAAABqgEgAAAAAasBQAAAAAGsAUAAAAABrQFAAAAAAcoBAQAAAAHLAQEAAAAB3AEAAADcAQLdAQEAAAAB3gEBAAAAAd8BAQAAAAHgARAAAAAB4QEQAAAAAeIBAgAAAAEEHAAAxgMAMPwBAADHAwAw_gEAAMkDACCCAgAAygMAMAQcAAC7AwAw_AEAALwDADD-AQAAvgMAIIICAAD-AgAwBBwAALIDADD8AQAAswMAMP4BAAC1AwAgggIAAOACADAEHAAAoQMAMPwBAACiAwAw_gEAAKQDACCCAgAApQMAMAMcAACbAwAg_AEAAJwDACCCAgAAAQAgAxwAAPICACD8AQAA8wIAIIICAACsAQAgBBwAANwCADD8AQAA3QIAMP4BAADfAgAgggIAAOACADAEAgAA_AMAIA8AAKEEACC9AQAAzQIAIN0BAADNAgAgCwIAAPwDACAEAAD9AwAgCAAA_gMAIKsBAADNAgAgvQEAAM0CACC-AQAAzQIAIL8BAADNAgAgwQEAAM0CACDCAQAAzQIAIMMBAADNAgAgxAEAAM0CACAAAAAAAAAFHAAAuwQAIB0AAL4EACD8AQAAvAQAIP0BAAC9BAAgggIAAMQBACADHAAAuwQAIPwBAAC8BAAgggIAAMQBACAGAQAA8gMAIAMAAPMDACALAAD0AwAgngEAAM0CACCfAQAAzQIAIKsBAADNAgAgBQMAAPMDACDBAQAAzQIAIMIBAADNAgAgwwEAAM0CACDEAQAAzQIAIAAAAAAAAAUcAAC2BAAgHQAAuQQAIPwBAAC3BAAg_QEAALgEACCCAgAArAEAIAMcAAC2BAAg_AEAALcEACCCAgAArAEAIAAAAAAABRwAALEEACAdAAC0BAAg_AEAALIEACD9AQAAswQAIIICAAAjACADHAAAsQQAIPwBAACyBAAgggIAACMAIAAAAAAAAAAABRwAAKwEACAdAACvBAAg_AEAAK0EACD9AQAArgQAIIICAAABACADHAAArAQAIPwBAACtBAAgggIAAAEAIAAAAAAAAAAABRwAAKcEACAdAACqBAAg_AEAAKgEACD9AQAAqQQAIIICAADEAQAgAxwAAKcEACD8AQAAqAQAIIICAADEAQAgAAAKAQAA8gMAIAgAAP4DACALAAD0AwAgDQAAogQAIKsBAADNAgAgywEAAM0CACDeAQAAzQIAIN8BAADNAgAg4AEAAM0CACDhAQAAzQIAIAcHAACjBAAgCAAA_gMAIAsAAPQDACCrAQAAzQIAIMoBAADNAgAgywEAAM0CACDPAQAAzQIAIAgDAADzAwAgBwAAowQAIAkAAKQEACAOAACmBAAg1QEAAM0CACDWAQAAzQIAINgBAADNAgAg2QEAAM0CACAOAgAA_AMAIAcAAKMEACAJAACkBAAgCgAApQQAIOgBAADNAgAg6QEAAM0CACDqAQAAzQIAIOsBAADNAgAg7AEAAM0CACDtAQAAzQIAIO4BAADNAgAg7wEAAM0CACDwAQAAzQIAIPEBAADNAgAgEgMAAPADACALAADxAwAgmwEBAAAAAZwBAQAAAAGdAQEAAAABngEBAAAAAZ8BAQAAAAGhAQAAAKEBAqIBIAAAAAGkAQAAAKQBAqYBAAAApgECpwEgAAAAAagBAQAAAAGpAQEAAAABqgEgAAAAAasBQAAAAAGsAUAAAAABrQFAAAAAAQIAAADEAQAgHAAApwQAIAMAAADHAQAgHAAApwQAIB0AAKsEACAUAAAAxwEAIAMAANoCACALAADbAgAgFQAAqwQAIJsBAQDRAgAhnAEBANECACGdAQEA0QIAIZ4BAQDSAgAhnwEBANICACGhAQAA0wKhASKiASAA1AIAIaQBAADVAqQBIqYBAADWAqYBIqcBIADUAgAhqAEBANECACGpAQEA0QIAIaoBIADUAgAhqwFAANcCACGsAUAA2AIAIa0BQADYAgAhEgMAANoCACALAADbAgAgmwEBANECACGcAQEA0QIAIZ0BAQDRAgAhngEBANICACGfAQEA0gIAIaEBAADTAqEBIqIBIADUAgAhpAEAANUCpAEipgEAANYCpgEipwEgANQCACGoAQEA0QIAIakBAQDRAgAhqgEgANQCACGrAUAA1wIAIawBQADYAgAhrQFAANgCACEHAgAAoAQAIJsBAQAAAAGsAUAAAAABrQFAAAAAAbwBAQAAAAG9AQEAAAAB3QEBAAAAAQIAAAABACAcAACsBAAgAwAAAAMAIBwAAKwEACAdAACwBAAgCQAAAAMAIAIAAJ8EACAVAACwBAAgmwEBANECACGsAUAA2AIAIa0BQADYAgAhvAEBANECACG9AQEA0gIAId0BAQDSAgAhBwIAAJ8EACCbAQEA0QIAIawBQADYAgAhrQFAANgCACG8AQEA0QIAIb0BAQDSAgAh3QEBANICACEVAQAAlgQAIAgAAOwDACALAADtAwAgmwEBAAAAAaYBAAAA5AECqAEBAAAAAakBAQAAAAGqASAAAAABqwFAAAAAAawBQAAAAAGtAUAAAAABygEBAAAAAcsBAQAAAAHaAQEAAAAB3AEAAADcAQLdAQEAAAAB3gEBAAAAAd8BAQAAAAHgARAAAAAB4QEQAAAAAeIBAgAAAAECAAAAIwAgHAAAsQQAIAMAAAAhACAcAACxBAAgHQAAtQQAIBcAAAAhACABAACVBAAgCAAAsAMAIAsAALEDACAVAAC1BAAgmwEBANECACGmAQAArQPkASKoAQEA0QIAIakBAQDRAgAhqgEgANQCACGrAUAA1wIAIawBQADYAgAhrQFAANgCACHKAQEA0QIAIcsBAQDSAgAh2gEBANECACHcAQAAqwPcASLdAQEA0QIAId4BAQDSAgAh3wEBANICACHgARAA6QIAIeEBEADpAgAh4gECAKwDACEVAQAAlQQAIAgAALADACALAACxAwAgmwEBANECACGmAQAArQPkASKoAQEA0QIAIakBAQDRAgAhqgEgANQCACGrAUAA1wIAIawBQADYAgAhrQFAANgCACHKAQEA0QIAIcsBAQDSAgAh2gEBANECACHcAQAAqwPcASLdAQEA0QIAId4BAQDSAgAh3wEBANICACHgARAA6QIAIeEBEADpAgAh4gECAKwDACEPAgAA-wMAIAgAAJoDACCbAQEAAAABqgEgAAAAAasBQAAAAAGsAUAAAAABrQFAAAAAAbwBAQAAAAG9AQEAAAABvgEBAAAAAb8BAQAAAAHBAQAAAMEBA8IBAQAAAAHDARAAAAABxAEQAAAAAQIAAACsAQAgHAAAtgQAIAMAAAAFACAcAAC2BAAgHQAAugQAIBEAAAAFACACAAD6AwAgCAAA-QIAIBUAALoEACCbAQEA0QIAIaoBIADUAgAhqwFAANcCACGsAUAA2AIAIa0BQADYAgAhvAEBANECACG9AQEA0gIAIb4BAQDSAgAhvwEBANICACHBAQAA9wLBASPCAQEA0gIAIcMBEADpAgAhxAEQAOkCACEPAgAA-gMAIAgAAPkCACCbAQEA0QIAIaoBIADUAgAhqwFAANcCACGsAUAA2AIAIa0BQADYAgAhvAEBANECACG9AQEA0gIAIb4BAQDSAgAhvwEBANICACHBAQAA9wLBASPCAQEA0gIAIcMBEADpAgAhxAEQAOkCACESAQAA7wMAIAsAAPEDACCbAQEAAAABnAEBAAAAAZ0BAQAAAAGeAQEAAAABnwEBAAAAAaEBAAAAoQECogEgAAAAAaQBAAAApAECpgEAAACmAQKnASAAAAABqAEBAAAAAakBAQAAAAGqASAAAAABqwFAAAAAAawBQAAAAAGtAUAAAAABAgAAAMQBACAcAAC7BAAgAwAAAMcBACAcAAC7BAAgHQAAvwQAIBQAAADHAQAgAQAA2QIAIAsAANsCACAVAAC_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ADHAQAgHAAAzwQAIB0AANMEACAUAAAAxwEAIAEAANkCACADAADaAgAgFQAA0wQAIJsBAQDRAgAhnAEBANECACGdAQEA0QIAIZ4BAQDSAgAhnwEBANICACGhAQAA0wKhASKiASAA1AIAIaQBAADVAqQBIqYBAADWAqYBIqcBIADUAgAhqAEBANECACGpAQEA0QIAIaoBIADUAgAhqwFAANcCACGsAUAA2AIAIa0BQADYAgAhEgEAANkCACADAADaAgAgmwEBANECACGcAQEA0QIAIZ0BAQDRAgAhngEBANICACGfAQEA0gIAIaEBAADTAqEBIqIBIADUAgAhpAEAANUCpAEipgEAANYCpgEipwEgANQCACGoAQEA0QIAIakBAQDRAgAhqgEgANQCACGrAUAA1wIAIawBQADYAgAhrQFAANgCACEDAAAADQAgHAAAywQAIB0AANYEACATAAAADQAgBwAAiwQAIAsAANQDACAVAADWBAAgmwEBANECACGqASAA1AIAIasBQADXAgAhrAFAANgCACGtAUAA2AIAIcgBAQDRAgAhyQEBANECACHKAQEA0gIAIcsBAQDSAgAhzQEAANADzQEizgEQAOcCACHPARAA6QIAIdABAgCsAwAh0QECAKwDACHTAQAA0QPTASIRBwAAiwQAIAsAANQDACCbAQEA0QIAIaoBIADUAgAhqwFAANcCACGsAUAA2AIAIa0BQADYAgAhyAEBANECACHJAQEA0QIAIcoBAQDSAgAhywEBANICACHNAQAA0APNASLOARAA5wIAIc8BEADpAgAh0AECAKwDACHRAQIArAMAIdMBAADRA9MBIgMAAAAhACAcAADNBAAgHQAA2QQAIBcAAAAhACABAACVBAAgCwAAsQMAIA0AAK8DACAVAADZBAAgmwEBANECACGmAQAArQPkASKoAQEA0QIAIakBAQDRAgAhqgEgANQCACGrAUAA1wIAIawBQADYAgAhrQFAANgCACHKAQEA0QIAIcsBAQDSAgAh2gEBANECACHcAQAAqwPcASLdAQEA0QIAId4BAQDSAgAh3wEBANICACHgARAA6QIAIeEBEADpAgAh4gECAKwDACEVAQAAlQQAIAsAALEDACANAACvAwAgmwEBANECACGmAQAArQPkASKoAQEA0QIAIakBAQDRAgAhqgEgANQCACGrA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-IwA_NAA8NQA9AAAAAAAFDAA7IgA-IwA_NAA8NQA9AQIAAgECAAIFDABEIgBHIwBINABFNQBGAAAAAAAFDABEIgBHIwBINABFNQBGAAADDABNIgBOIwBPAAAAAwwATSIATiMATxACAREmARIoARMpARQqARYsARcuDhgvDxkxARozDhs0EB41AR82ASA3DiQ6ESU7FSY8CCc9CCg-CCk_CCpACCtCCCxEDi1FFi5HCC9JDjBKFzFLCDJMCDNNDjZQGDdRHjhSBjlTBjpUBjtVBjxWBj1YBj5aDj9bH0BdBkFfDkJgIENhBkRiBkVjDkZmIUdnJ0hoBUlpBUpqBUtrBUxsBU1uBU5wDk9xKFBzBVF1DlJ2KVN3BVR4BVV5DlZ8Kld9Llh-B1l_B1qAAQdbgQEHXIIBB12EAQdehgEOX4cBL2CJAQdhiwEOYowBMGONAQdkjgEHZY8BDmaSATFnkwE3aJUBBGmWAQRqmAEEa5kBBGyaAQRtnAEEbp4BDm-fAThwoQEEcaMBDnKkATlzpQEEdKYBBHWnAQ52qgE6d6sBQHitAQN5rgEDerABA3uxAQN8sgEDfbQBA362AQ5_twFBgAG5AQOBAbsBDoIBvAFCgwG9AQOEAb4BA4UBvwEOhgHCAUOHAcMBSYgBxQECiQHGAQKKAckBAosBygECjAHLAQKNAc0BAo4BzwEOjwHQAUqQAdIBApEB1AEOkgHVAUuTAdYBApQB1wEClQHYAQ6WAdsBTJcB3AFQ"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  JsonNullValueFilter: () => JsonNullValueFilter,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullableJsonNullValueInput: () => NullableJsonNullValueInput,
  NullsOrder: () => NullsOrder,
  OwnerScalarFieldEnum: () => OwnerScalarFieldEnum,
  PaymentScalarFieldEnum: () => PaymentScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  PropertyScalarFieldEnum: () => PropertyScalarFieldEnum,
  QueryMode: () => QueryMode,
  RentalScalarFieldEnum: () => RentalScalarFieldEnum,
  RoomScalarFieldEnum: () => RoomScalarFieldEnum,
  RoommateScalarFieldEnum: () => RoommateScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TenantScalarFieldEnum: () => TenantScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
var runtime2 = __toESM(require("@prisma/client/runtime/client"), 1);
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.10.0",
  engine: "0edf323efd1d98336f3f0a68684b56f689b900d3"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Owner: "Owner",
  Payment: "Payment",
  Property: "Property",
  Rental: "Rental",
  Room: "Room",
  Roommate: "Roommate",
  Tenant: "Tenant",
  User: "User"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var OwnerScalarFieldEnum = {
  id: "id",
  userId: "userId",
  phone: "phone",
  address: "address",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var PaymentScalarFieldEnum = {
  id: "id",
  status: "status",
  amount: "amount",
  currency: "currency",
  paymentGateway: "paymentGateway",
  merchantInvoiceNumber: "merchantInvoiceNumber",
  bkashPaymentId: "bkashPaymentId",
  bkashTrxId: "bkashTrxId",
  payerReference: "payerReference",
  paidAt: "paidAt",
  gatewayResponse: "gatewayResponse",
  refundTrxId: "refundTrxId",
  refundAmount: "refundAmount",
  refundReason: "refundReason",
  refundedAt: "refundedAt",
  userId: "userId",
  propertyId: "propertyId",
  roomId: "roomId",
  rentalId: "rentalId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var PropertyScalarFieldEnum = {
  id: "id",
  ownerId: "ownerId",
  title: "title",
  description: "description",
  propertyType: "propertyType",
  address: "address",
  city: "city",
  area: "area",
  imageUrl: "imageUrl",
  imagePublicId: "imagePublicId",
  latitude: "latitude",
  longitude: "longitude",
  totalRooms: "totalRooms",
  status: "status",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var RentalScalarFieldEnum = {
  id: "id",
  tenantId: "tenantId",
  propertyId: "propertyId",
  roomId: "roomId",
  message: "message",
  proposedMoveIn: "proposedMoveIn",
  status: "status",
  reviewedAt: "reviewedAt",
  reviewNote: "reviewNote",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var RoomScalarFieldEnum = {
  id: "id",
  propertyId: "propertyId",
  roomNumber: "roomNumber",
  title: "title",
  description: "description",
  roomType: "roomType",
  amount: "amount",
  securityDeposit: "securityDeposit",
  capacity: "capacity",
  currentOccupants: "currentOccupants",
  availability: "availability",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var RoommateScalarFieldEnum = {
  id: "id",
  tenantId: "tenantId",
  gender: "gender",
  smokingAllowed: "smokingAllowed",
  petsAllowed: "petsAllowed",
  preferredLocation: "preferredLocation",
  minBudget: "minBudget",
  maxBudget: "maxBudget",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var TenantScalarFieldEnum = {
  id: "id",
  userId: "userId",
  phone: "phone",
  occupation: "occupation",
  bio: "bio",
  gender: "gender",
  preferredLocation: "preferredLocation",
  minBudget: "minBudget",
  maxBudget: "maxBudget",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  googleId: "googleId",
  authProvider: "authProvider",
  isEmailVerified: "isEmailVerified",
  role: "role",
  status: "status",
  needPasswordChange: "needPasswordChange",
  imageUrl: "imageUrl",
  imagePublicId: "imagePublicId",
  isDeleted: "isDeleted",
  deletedAt: "deletedAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var NullableJsonNullValueInput = {
  DbNull: DbNull2,
  JsonNull: JsonNull2
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var JsonNullValueFilter = {
  DbNull: DbNull2,
  JsonNull: JsonNull2,
  AnyNull: AnyNull2
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var Role = {
  OWNER: "OWNER",
  TENANT: "TENANT",
  ADMIN: "ADMIN"
};
var AuthProvider = {
  CREDENTIAL: "CREDENTIAL",
  GOOGLE: "GOOGLE"
};
var UserStatus = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
  DELETED: "DELETED"
};
var PropertyType = {
  APARTMENT: "APARTMENT",
  HOUSE: "HOUSE",
  HOSTEL: "HOSTEL",
  ROOM: "ROOM"
};
var PropertyStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE"
};
var RoomType = {
  SINGLE: "SINGLE",
  DOUBLE: "DOUBLE",
  SHARED: "SHARED"
};
var RoomAvailability = {
  AVAILABLE: "AVAILABLE",
  RESERVED: "RESERVED",
  OCCUPIED: "OCCUPIED"
};
var Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER"
};
var ApplicationStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED"
};
var PaymentStatus = {
  UNPAID: "UNPAID",
  PAID: "PAID",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED"
};

// generated/prisma/client.ts
var import_meta = {};
globalThis["__dirname"] = path.dirname((0, import_node_url.fileURLToPath)(import_meta.url));
var PrismaClient = getPrismaClientClass();

// src/app/config/index.ts
var import_dotenv = __toESM(require("dotenv"), 1);
var import_path = __toESM(require("path"), 1);
import_dotenv.default.config({ path: import_path.default.join(process.cwd(), ".env") });
var config_default = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bak_url: process.env.APP_URL,
  frontend_url: process.env.FRONTEND_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  tester_admin_name: process.env.TESTER_ADMIN_NAME,
  tester_admin_email: process.env.TESTER_ADMIN_EMAIL,
  tester_admin_password: process.env.TESTER_ADMIN_PASSWORD,
  tester_owner_name: process.env.TESTER_OWNER_NAME,
  tester_owner_email: process.env.TESTER_OWNER_EMAIL,
  tester_owner_password: process.env.TESTER_OWNER_PASSWORD,
  tester_tenant_name: process.env.TESTER_TENANT_NAME,
  tester_tenant_email: process.env.TESTER_TENANT_EMAIL,
  tester_tenant_password: process.env.TESTER_TENANT_PASSWORD,
  redis_user: process.env.REDIS_USER,
  redis_passowrd: process.env.REDIS_PASSWORD,
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
  smtp_user: process.env.SMTP_USER,
  smtp_password: process.env.SMTP_PASSWORD,
  email_sender: process.env.EMAIL_SENDER,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret_key: process.env.CLOUDINARY_SECRET_KEY,
  bkash_base_url: process.env.BKASH_BASE_URL,
  bkash_username: process.env.BAKSH_USERNAME,
  bkash_password: process.env.BKASH_PASSWORD,
  bkash_app_key: process.env.BKASH_APP_KEY,
  bkash_app_secret: process.env.BKASH_APP_SECRET,
  bkash_callBack_url: process.env.BKASH_CALLBACK_URL
};

// src/app/utils/AppError.ts
var AppError = class extends Error {
  statusCode;
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};

// src/app/middleware/globalErrorHandler.ts
var globalErrorHandler = async (err, _req, res, _next) => {
  console.log("Error from Global Error Handler", err);
  let statusCode = import_http_status2.default.INTERNAL_SERVER_ERROR;
  let errorMessage = err.message || "Internal Server Error";
  const errorName = err.name || "Internal Server Error";
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = import_http_status2.default.BAD_REQUEST;
    errorMessage = "You have provided incorrect field type or missing fields";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = import_http_status2.default.BAD_REQUEST, errorMessage = "Duplicate Key Error";
    } else if (err.code === "P2003") {
      statusCode = import_http_status2.default.BAD_REQUEST, errorMessage = "Foreign key constraint failed";
    } else if (err.code === "P2025") {
      statusCode = import_http_status2.default.BAD_REQUEST, errorMessage = "An operation failed because it depends on one or more records that were required but not found.";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = import_http_status2.default.UNAUTHORIZED;
      errorMessage = "Authentication failed against database server. Please Check Your Credentials";
    } else if (err.errorCode === "P1001") {
      statusCode = import_http_status2.default.BAD_REQUEST;
      errorMessage = "Can't reach database server";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = import_http_status2.default.INTERNAL_SERVER_ERROR;
    errorMessage = "Error occurred during query execution";
  } else if (err instanceof AppError) {
    errorMessage = err.message;
    statusCode = err.statusCode;
  } else if (err instanceof Error) {
    errorMessage = err.message;
  }
  res.status(statusCode).json({
    success: false,
    statusCode,
    name: errorName,
    message: errorMessage,
    error: config_default.node_env === "development" ? err : void 0,
    stack: config_default.node_env === "development" ? err.stack : void 0
  });
};

// src/app/module/auth/auth.route.ts
var import_express = require("express");

// src/app/module/auth/auth.controller.ts
var import_http_status4 = __toESM(require("http-status"), 1);

// src/app/utils/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// src/app/utils/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    meta: data.meta
  });
};

// src/app/module/auth/auth.services.ts
var import_bcryptjs = __toESM(require("bcryptjs"), 1);

// src/app/lib/prisma.ts
var import_config2 = require("dotenv/config");
var import_adapter_pg = require("@prisma/adapter-pg");
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new import_adapter_pg.PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/app/module/auth/auth.services.ts
var import_crypto = __toESM(require("crypto"), 1);
var import_ejs = __toESM(require("ejs"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_http_status3 = __toESM(require("http-status"), 1);

// src/app/lib/redis.ts
var import_redis = require("redis");
var redisClient = (0, import_redis.createClient)({
  username: config_default.redis_user,
  password: config_default.redis_passowrd,
  socket: {
    host: config_default.redis_host,
    port: Number(config_default.redis_port)
  }
});

// src/app/lib/nodemailer.ts
var import_nodemailer = __toESM(require("nodemailer"), 1);
var transporter = import_nodemailer.default.createTransport({
  service: "gmail",
  // Shortcut for Gmail's SMTP settings - see Well-Known Services
  auth: {
    user: config_default.smtp_user,
    pass: config_default.smtp_password
  }
});

// src/app/utils/jwt.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var createToken = (payload, secret, expiresIn) => {
  const token = import_jsonwebtoken.default.sign(payload, secret, {
    expiresIn
  });
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const verifiedToken = import_jsonwebtoken.default.verify(token, secret);
    return {
      success: true,
      data: verifiedToken
    };
  } catch (error) {
    console.log("Token verification failed:", error);
    return {
      success: false,
      error: error.message
    };
  }
};
var jwtUtils = {
  createToken,
  verifyToken
};

// src/app/lib/googleAuth.ts
var import_google_auth_library = require("google-auth-library");
var googleClient = new import_google_auth_library.OAuth2Client({
  client_id: config_default.google_client_id
});

// src/app/module/auth/auth.services.ts
var createUser = async (payload) => {
  const { name, password, role, tenant: tenantData } = payload;
  const email = payload.email.trim().toLowerCase();
  const isUserExists = await prisma.user.findUnique({
    where: { email }
  });
  if (isUserExists) {
    throw new AppError(import_http_status3.default.CONFLICT, "User with this email already exists");
  }
  const hashedPassword = await import_bcryptjs.default.hash(password, 8);
  const otp = import_crypto.default.randomInt(1e5, 1e6);
  const otpKey = `user-registation-otp:${email}`;
  await redisClient.set(otpKey, otp, {
    expiration: {
      type: "EX",
      value: 5 * 60
    }
  });
  const userRegistationKey = `user-registation-data:${email}`;
  const redisUserPayload = {
    name,
    email,
    password: hashedPassword,
    role,
    tenant: tenantData
  };
  await redisClient.set(userRegistationKey, JSON.stringify(redisUserPayload), {
    expiration: {
      type: "EX",
      value: 5 * 60
    }
  });
  const tamplatePath = import_path2.default.join(process.cwd(), "src/app/tamplates/user-registation-otp.ejs");
  const html = await import_ejs.default.renderFile(tamplatePath, {
    name,
    otp
  });
  await transporter.sendMail({
    from: '"HomeSync Platform" <no-reply@home-sync.com>',
    to: email,
    subject: "Action Required: Verify Your HomeSync Account",
    html
  });
};
var verifyUserEmail = async (payload) => {
  const email = payload.email.trim().toLowerCase();
  const otp = payload.otp;
  const isUserExists = await prisma.user.findUnique({
    where: { email }
  });
  if (isUserExists?.status === "BLOCKED") {
    throw new AppError(import_http_status3.default.FORBIDDEN, "User is blocked");
  }
  if (isUserExists?.isDeleted || isUserExists?.status === "DELETED") {
    throw new AppError(import_http_status3.default.FORBIDDEN, "User is deleted");
  }
  if (isUserExists?.isEmailVerified) {
    throw new AppError(import_http_status3.default.CONFLICT, "User already verified");
  }
  const otpKey = `user-registation-otp:${email}`;
  const redisOtp = await redisClient.get(otpKey);
  if (!redisOtp) {
    throw new AppError(import_http_status3.default.BAD_REQUEST, "Invalid OTP");
  }
  if (redisOtp !== otp) {
    throw new AppError(import_http_status3.default.BAD_REQUEST, "OTP does not match");
  }
  await redisClient.del([otpKey]);
  const userRegistationKey = `user-registation-data:${email}`;
  const redisUserData = await redisClient.get(userRegistationKey);
  if (!redisUserData) {
    throw new AppError(import_http_status3.default.NOT_FOUND, "User Does not exists");
  }
  const userPayload = JSON.parse(redisUserData);
  const profile = userPayload.role === Role.OWNER ? {
    owner: {
      create: {
        phone: userPayload.owner?.phone || "",
        address: userPayload.owner?.address || ""
      }
    }
  } : {
    tenant: {
      create: {
        phone: userPayload.tenant?.phone || "",
        occupation: userPayload.tenant?.occupation || "",
        bio: userPayload.tenant?.bio || ""
      }
    }
  };
  const include = userPayload.role === "OWNER" ? { owner: true } : { tenant: true };
  const createdUser = await prisma.user.create({
    data: {
      name: userPayload.name,
      email: userPayload.email,
      password: userPayload.password,
      role: userPayload.role,
      status: UserStatus.ACTIVE,
      isEmailVerified: true,
      ...profile
    },
    omit: { password: true },
    include
  });
  await redisClient.del([userRegistationKey]);
  const tamplatePath = import_path2.default.join(process.cwd(), "src/app/tamplates/welcome-email.ejs");
  const html = await import_ejs.default.renderFile(tamplatePath, {
    name: createdUser.name,
    loginUrl: config_default.frontend_url
  });
  await transporter.sendMail({
    from: '"HomeSync Platform" <no-reply@home-sync.com>',
    to: email,
    subject: "Welcome to HomeSync!",
    html
  });
  const { tenant, ...user } = createdUser;
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return {
    user,
    tenant,
    accessToken,
    refreshToken: refreshToken3
  };
};
var loginUser = async (payload) => {
  const { password } = payload;
  const email = payload.email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email }
  });
  if (!user) {
    throw new AppError(import_http_status3.default.NOT_FOUND, "User not found");
  }
  if (user.status === UserStatus.BLOCKED) {
    throw new AppError(import_http_status3.default.FORBIDDEN, "User is blocked");
  }
  if (user.isDeleted || user.status === "DELETED") {
    throw new AppError(import_http_status3.default.FORBIDDEN, "User is deleted");
  }
  if (user.password === null && user.googleId !== null) {
    throw new AppError(import_http_status3.default.CONFLICT, "User already has account registered with google. Try to google login");
  }
  const isPasswordMatched = await import_bcryptjs.default.compare(password, user.password);
  if (!isPasswordMatched) {
    throw new AppError(import_http_status3.default.UNAUTHORIZED, "Invalid credentials");
  }
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3
  };
};
var refreshToken = async (token) => {
  const verifiedRefreshToken = jwtUtils.verifyToken(
    token,
    config_default.jwt_refresh_secret
  );
  if (!verifiedRefreshToken.success || !verifiedRefreshToken.data) {
    throw new AppError(
      import_http_status3.default.UNAUTHORIZED,
      config_default.node_env === "development" ? verifiedRefreshToken.error : "Invalid refresh token"
    );
  }
  const data = verifiedRefreshToken.data;
  const user = await prisma.user.findUnique({
    where: { id: data.userId }
  });
  if (!user || user.isDeleted || user.status !== UserStatus.ACTIVE) {
    throw new AppError(import_http_status3.default.UNAUTHORIZED, "User is inactive or not found");
  }
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3
  };
};
var googleLoginIntoDB = async (payload) => {
  let googleIdTokenPayload = null;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: payload.idToken,
      audience: config_default.google_client_id
    });
    googleIdTokenPayload = ticket.getPayload();
  } catch (error) {
    console.log("Google ID verification field", error);
    throw new AppError(import_http_status3.default.UNAUTHORIZED, "Invalid or Expired google ID Token");
  }
  if (!googleIdTokenPayload) {
    throw new AppError(import_http_status3.default.UNAUTHORIZED, "Invalid or Expired google ID Token");
  }
  if (!googleIdTokenPayload.email) {
    throw new AppError(import_http_status3.default.BAD_REQUEST, "Email not fount");
  }
  if (!googleIdTokenPayload.name) {
    throw new AppError(import_http_status3.default.BAD_REQUEST, "Name not fount");
  }
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: googleIdTokenPayload.email,
      role: Role.TENANT,
      googleId: googleIdTokenPayload.sub
    }
  });
  let user = isUserExists;
  if (!isUserExists) {
    const isUserExistsWithCredentials = await prisma.user.findUnique({
      where: {
        email: googleIdTokenPayload.email,
        role: Role.TENANT,
        authProvider: AuthProvider.GOOGLE
      }
    });
    if (isUserExistsWithCredentials) {
      if (!isUserExistsWithCredentials.isEmailVerified) {
        throw new AppError(import_http_status3.default.FORBIDDEN, "Email not verified");
      }
      if (isUserExistsWithCredentials.status === UserStatus.BLOCKED) {
        throw new AppError(import_http_status3.default.FORBIDDEN, "User Is Blocked");
      }
      if (isUserExistsWithCredentials.isDeleted) {
        throw new AppError(import_http_status3.default.FORBIDDEN, "User is Deleted");
      }
      user = await prisma.user.update({
        where: {
          id: isUserExistsWithCredentials.id
        },
        data: {
          googleId: googleIdTokenPayload.sub
        }
      });
    } else {
      user = await prisma.user.create({
        data: {
          name: googleIdTokenPayload.name,
          email: googleIdTokenPayload.email,
          role: Role.TENANT,
          googleId: googleIdTokenPayload.sub,
          authProvider: AuthProvider.GOOGLE,
          isEmailVerified: true,
          imageUrl: googleIdTokenPayload.picture || "",
          tenant: {
            create: {}
          }
        }
      });
      const tamplatePath = import_path2.default.join(process.cwd(), "src/app/tamplates/welcome-email.ejs");
      const html = await import_ejs.default.renderFile(tamplatePath, {
        name: user.name,
        loginUrl: config_default.frontend_url
      });
      await transporter.sendMail({
        from: '"HomeSync Platform" <no-reply@home-sync.com>',
        to: user.email,
        subject: "Welcome to HomeSync!",
        html
      });
    }
  }
  if (!user) {
    throw new AppError(import_http_status3.default.NOT_FOUND, "User not found");
  }
  if (user.status === UserStatus.BLOCKED) {
    throw new AppError(import_http_status3.default.FORBIDDEN, "User Is Blocked");
  }
  if (user.isDeleted || user.status === "DELETED") {
    throw new AppError(import_http_status3.default.FORBIDDEN, "User is Deleted");
  }
  const jwtPayload = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in
  );
  const refreshToken3 = jwtUtils.createToken(
    jwtPayload,
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in
  );
  return {
    accessToken,
    refreshToken: refreshToken3
  };
};
var AuthService = {
  createUser,
  verifyUserEmail,
  loginUser,
  refreshToken,
  googleLoginIntoDB
};

// src/app/module/auth/auth.controller.ts
var createUser2 = catchAsync(async (req, res) => {
  const payload = req.body;
  await AuthService.createUser(payload);
  sendResponse(res, {
    statusCode: import_http_status4.default.CREATED,
    success: true,
    message: "User Varifaction OTP Sent",
    data: null
  });
});
var verifyUserEmail2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.verifyUserEmail(payload);
  const { accessToken, refreshToken: refreshToken3, user, tenant } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
  });
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
  });
  sendResponse(res, {
    statusCode: import_http_status4.default.CREATED,
    success: true,
    message: "Patient Ragistaion Successfully",
    data: {
      accessToken,
      refreshToken: refreshToken3,
      user,
      tenant
    }
  });
});
var loginUser2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.loginUser(payload);
  const { accessToken, refreshToken: refreshToken3 } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
  });
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
  });
  sendResponse(res, {
    statusCode: import_http_status4.default.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken,
      refreshToken: refreshToken3
    }
  });
});
var refreshToken2 = catchAsync(async (req, res) => {
  if (!req.cookies.refreshToken) {
    throw new AppError(import_http_status4.default.BAD_REQUEST, "Refresh token is missing");
  }
  const result = await AuthService.refreshToken(req.cookies.refreshToken);
  const { accessToken, refreshToken: newRefreshToken } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
  });
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
  });
  sendResponse(res, {
    statusCode: import_http_status4.default.OK,
    success: true,
    message: "New tokens generated successfully",
    data: {
      accessToken,
      refreshToken: newRefreshToken
    }
  });
});
var googleLogin = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.googleLoginIntoDB(payload);
  const { accessToken, refreshToken: refreshToken3 } = result;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24
  });
  res.cookie("refreshToken", refreshToken3, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 1e3 * 60 * 60 * 24 * 7
  });
  sendResponse(res, {
    statusCode: import_http_status4.default.OK,
    success: true,
    message: "New tokens generated successfully",
    data: { accessToken, refreshToken: refreshToken3 }
  });
});
var AuthController = {
  createUser: createUser2,
  verifyUserEmail: verifyUserEmail2,
  loginUser: loginUser2,
  refreshToken: refreshToken2,
  googleLogin
};

// src/app/utils/validationRequest.ts
var import_http_status5 = __toESM(require("http-status"), 1);
var validationRequest = (zodSchema) => {
  return catchAsync(
    async (req, res, next) => {
      let payload = req.body ?? {};
      if (req.body?.data && typeof req.body.data === "string") {
        try {
          payload = JSON.parse(req.body.data);
        } catch (error) {
          throw new AppError(
            import_http_status5.default.BAD_REQUEST,
            "Invalid JSON data"
          );
        }
      }
      const result = zodSchema.safeParse(payload);
      if (!result.success) {
        throw new AppError(
          import_http_status5.default.BAD_REQUEST,
          result.error.issues[0].message
        );
      }
      next();
    }
  );
};

// src/app/module/auth/auth.validation.ts
var import_zod = require("zod");
var registerUserValidationSchema = import_zod.z.object({
  name: import_zod.z.string().trim().min(2, "Name must be at least 2 characters long").optional(),
  email: import_zod.z.string({
    message: "Email is required"
  }).trim().toLowerCase().email("Invalid email address format"),
  password: import_zod.z.string().min(6).regex(/[A-Z]/, { message: "Add an uppercase letter" }).regex(/[a-z]/, { message: "Add a lowercase letter" }).regex(/[0-9]/, { message: "Add a number" }),
  role: import_zod.z.enum([Role.OWNER, Role.TENANT], {
    message: "Role must be either OWNER or TENANT"
  }).optional(),
  tenant: import_zod.z.object({
    phone: import_zod.z.string().trim().optional(),
    occupation: import_zod.z.string().trim().optional(),
    bio: import_zod.z.string().trim().optional()
  }).optional(),
  owner: import_zod.z.object({
    phone: import_zod.z.string().trim().optional(),
    address: import_zod.z.string().trim().optional()
  }).optional()
});
var verifyUserEmailValidationSchema = import_zod.z.object({
  email: import_zod.z.string({
    message: "Email is required"
  }).trim().toLowerCase().email("Invalid email address format"),
  otp: import_zod.z.string({
    message: "OTP is required"
  }).regex(/^\d{6}$/, "OTP must be a 6-digit number")
});
var loginUserValidationSchema = import_zod.z.object({
  email: import_zod.z.string({
    message: "Email is required"
  }).trim().toLowerCase().email("Invalid email address format"),
  password: import_zod.z.string().min(6).regex(/[A-Z]/, { message: "Add an uppercase letter" }).regex(/[a-z]/, { message: "Add a lowercase letter" }).regex(/[0-9]/, { message: "Add a number" })
});
var AuthValidation = {
  registerUserValidationSchema,
  verifyUserEmailValidationSchema,
  loginUserValidationSchema
};

// src/app/module/auth/auth.route.ts
var router = (0, import_express.Router)();
router.post("/register", validationRequest(AuthValidation.registerUserValidationSchema), AuthController.createUser);
router.post("/verify-email", validationRequest(AuthValidation.verifyUserEmailValidationSchema), AuthController.verifyUserEmail);
router.post("/login", validationRequest(AuthValidation.loginUserValidationSchema), AuthController.loginUser);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/google", AuthController.googleLogin);
var AuthRoutes = router;

// src/app/module/user/user.route.ts
var import_express2 = require("express");

// src/app/middleware/checkAuth.ts
var import_http_status6 = __toESM(require("http-status"), 1);
var auth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;
    if (!token) {
      throw new AppError(
        import_http_status6.default.UNAUTHORIZED,
        "You are not logged in. Please log in to access this resource."
      );
    }
    const verifiedToken = jwtUtils.verifyToken(token, config_default.jwt_access_secret);
    if (!verifiedToken.success) {
      throw new AppError(import_http_status6.default.UNAUTHORIZED, verifiedToken.error);
    }
    const { email, name, userId, role } = verifiedToken.data;
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(
        import_http_status6.default.FORBIDDEN,
        "Forbidden. You don't have permission to access this resource."
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        email,
        name,
        role
      }
    });
    if (!user) {
      throw new AppError(import_http_status6.default.NOT_FOUND, "User not found. Please log in again.");
    }
    if (user.status === "BLOCKED") {
      throw new AppError(import_http_status6.default.FORBIDDEN, "Your account has been blocked. Please contact support.");
    }
    req.user = {
      email,
      name,
      userId,
      role
    };
    next();
  });
};

// src/app/module/user/user.controller.ts
var import_http_status8 = __toESM(require("http-status"), 1);

// src/app/module/user/user.services.ts
var import_http_status7 = __toESM(require("http-status"), 1);
var getMe = async (user) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: user.userId
    },
    include: {
      tenant: user.role === "TENANT",
      owner: user.role === "OWNER"
    },
    omit: {
      password: true
    }
  });
  if (!isUserExists) {
    throw new AppError(import_http_status7.default.NOT_FOUND, "User not found");
  }
  return isUserExists;
};
var updateMyProfile = async (user, payload) => {
  const { name, tenant: tenantData, owner: ownerData } = payload;
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: user.userId
    }
  });
  if (!isUserExists) {
    throw new AppError(import_http_status7.default.NOT_FOUND, "User not Found");
  }
  if (isUserExists.status === "BLOCKED" || isUserExists.isDeleted) {
    throw new Error("user is already deleted");
  }
  const updatedUser = await prisma.user.update({
    where: {
      id: user.userId
    },
    data: {
      name,
      tenant: user.role === "TENANT" ? {
        update: {
          phone: tenantData?.phone,
          occupation: tenantData?.occupation,
          bio: tenantData?.bio,
          preferredLocation: tenantData?.preferredLocation,
          maxBudget: tenantData?.maxBudget,
          minBudget: tenantData?.minBudget
        }
      } : void 0,
      owner: user.role === "OWNER" ? {
        update: {
          phone: ownerData?.phone,
          address: ownerData?.address
        }
      } : void 0
    },
    include: {
      tenant: user.role === "TENANT",
      owner: user.role === "OWNER"
    }
  });
  return updatedUser;
};
var getUserById = async (userId) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      id: userId
    },
    omit: {
      password: true
    }
  });
  if (!isUserExists) {
    throw new AppError(import_http_status7.default.NOT_FOUND, "User not Found");
  }
  if (isUserExists.status === "BLOCKED" || isUserExists.isDeleted) {
    throw new Error("user is already deleted");
  }
  return isUserExists;
};
var UserServices = {
  getMe,
  updateMyProfile,
  getUserById
};

// src/app/module/user/user.controller.ts
var getMe2 = catchAsync(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new AppError(import_http_status8.default.BAD_REQUEST, "User information is missing in the request");
  }
  const result = await UserServices.getMe(user);
  sendResponse(res, {
    statusCode: import_http_status8.default.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result
  });
});
var updateMyProfile2 = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = req.body;
  if (!user) {
    throw new AppError(import_http_status8.default.BAD_REQUEST, "User information is missing in the request");
  }
  const result = await UserServices.updateMyProfile(user, payload);
  sendResponse(res, {
    statusCode: import_http_status8.default.OK,
    success: true,
    message: "User profile updated successfully",
    data: result
  });
});
var getUserById2 = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const result = await UserServices.getUserById(userId);
  sendResponse(res, {
    statusCode: import_http_status8.default.OK,
    success: true,
    message: "User profile fetched successfully",
    data: result
  });
});
var UserController = {
  getMe: getMe2,
  updateMyProfile: updateMyProfile2,
  getUserById: getUserById2
};

// src/app/module/user/user.validation.ts
var import_zod2 = __toESM(require("zod"), 1);
var updateUserValidationSchema = import_zod2.default.object({
  name: import_zod2.default.string().trim().min(2, "Name must be at least 2 characters long").optional(),
  imageUrl: import_zod2.default.string().trim().url("Invalid image URL").optional(),
  imagePublicId: import_zod2.default.string().trim().optional(),
  tenant: import_zod2.default.object({
    phone: import_zod2.default.string().trim().optional(),
    occupation: import_zod2.default.string().trim().optional(),
    bio: import_zod2.default.string().trim().optional(),
    preferredLocation: import_zod2.default.string().trim().optional(),
    maxBudget: import_zod2.default.number().positive("Maximum budget must be greater than 0").optional(),
    minBudget: import_zod2.default.number().positive("Minimum budget must be greater than 0").optional()
  }).optional()
});

// src/app/module/user/user.route.ts
var router2 = (0, import_express2.Router)();
router2.get(
  "/me",
  auth(Role.ADMIN, Role.OWNER, Role.TENANT),
  UserController.getMe
);
router2.patch("/me/update", auth(Role.ADMIN, Role.OWNER, Role.TENANT), validationRequest(updateUserValidationSchema), UserController.updateMyProfile);
router2.get("/:id", auth(Role.ADMIN, Role.OWNER, Role.TENANT), UserController.getUserById);
var UserRoutes = router2;

// src/app/module/owner/owner.route.ts
var import_express3 = require("express");

// src/app/module/owner/owner.services.ts
var import_http_status9 = __toESM(require("http-status"), 1);

// src/app/lib/cloudinary.ts
var import_cloudinary = require("cloudinary");
import_cloudinary.v2.config({
  cloud_name: config_default.cloudinary_cloud_name,
  api_key: config_default.cloudinary_api_key,
  api_secret: config_default.cloudinary_secret_key
});
var cloudinary = import_cloudinary.v2;

// src/app/module/owner/owner.services.ts
var createProperty = async (payload, userId, image) => {
  const { title, description, propertyType, address, city, area, latitude, longitude, totalRooms } = payload;
  const owner = await prisma.owner.findUnique({
    where: {
      userId
    }
  });
  if (!owner) {
    throw new AppError(import_http_status9.default.NOT_FOUND, "Owner Profile Not Found");
  }
  const ImagesLink = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "auto"
      },
      async (error, result) => {
        if (error) {
          return reject(error.message);
        }
        if (!result) {
          return reject(new AppError(import_http_status9.default.INTERNAL_SERVER_ERROR, "No Result Renturned"));
        }
        resolve(result);
      }
    ).end(image?.buffer);
  });
  const property = await prisma.property.create({
    data: {
      ownerId: owner.id,
      title,
      description,
      propertyType,
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
      rooms: true
    }
  });
  return property;
};
var getMyProperties = async (userId) => {
  const owner = await prisma.owner.findUnique({
    where: {
      userId
    }
  });
  if (!owner) {
    throw new AppError(
      import_http_status9.default.NOT_FOUND,
      "Owner Profile Not Found"
    );
  }
  const properties = await prisma.property.findMany({
    where: {
      ownerId: owner.id,
      isDeleted: false
    },
    include: {
      rooms: true,
      owner: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return properties;
};
var updateProperty = async (propertyId, userId, payload, image) => {
  const owner = await prisma.owner.findUnique({
    where: {
      userId
    }
  });
  if (!owner) {
    throw new AppError(
      import_http_status9.default.NOT_FOUND,
      "Owner Profile Not Found"
    );
  }
  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
      ownerId: owner.id,
      isDeleted: false
    }
  });
  if (!property) {
    throw new AppError(
      import_http_status9.default.NOT_FOUND,
      "Property Not Found or You are not the owner"
    );
  }
  let imageUrl = property.imageUrl;
  let imagePublicId = property.imagePublicId;
  if (image) {
    const uploadedImage = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: "auto"
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            if (!result) {
              return reject(
                new AppError(
                  import_http_status9.default.INTERNAL_SERVER_ERROR,
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
      id: propertyId
    },
    data: {
      ...payload,
      imageUrl,
      imagePublicId
    },
    include: {
      owner: true,
      rooms: true
    }
  });
  return updatedProperty;
};
var deleteProperty = async (propertyId, userId) => {
  const owner = await prisma.owner.findUnique({
    where: {
      userId
    }
  });
  if (!owner) {
    throw new AppError(
      import_http_status9.default.NOT_FOUND,
      "Owner Profile Not Found"
    );
  }
  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
      ownerId: owner.id,
      isDeleted: false
    }
  });
  if (!property) {
    throw new AppError(
      import_http_status9.default.NOT_FOUND,
      "Property Not Found or You are not the owner"
    );
  }
  await prisma.property.update({
    where: {
      id: propertyId
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
  return null;
};
var OwnerServices = {
  createProperty,
  getMyProperties,
  updateProperty,
  deleteProperty
};

// src/app/module/owner/owner.controller.ts
var import_http_status10 = __toESM(require("http-status"), 1);
var createProperty2 = catchAsync(async (req, res, next) => {
  const image = req.file || null;
  const data = JSON.parse(req.body.data);
  const userId = req.user?.userId;
  console.log(data, image);
  const result = await OwnerServices.createProperty(data, userId, image);
  sendResponse(res, {
    statusCode: import_http_status10.default.OK,
    success: true,
    message: "Property Created Successfully",
    data: result
  });
});
var getMyProperties2 = catchAsync(async (req, res, next) => {
  const userId = req.user?.userId;
  const result = await OwnerServices.getMyProperties(userId);
  sendResponse(res, {
    statusCode: import_http_status10.default.OK,
    success: true,
    message: "My Properties Retrieved Successfully",
    data: result
  });
});
var updateProperty2 = catchAsync(
  async (req, res, next) => {
    const propertyId = req.params.propertyId;
    const image = req.file || null;
    const data = JSON.parse(req.body.data);
    const userId = req.user?.userId;
    const result = await OwnerServices.updateProperty(propertyId, userId, data, image);
    sendResponse(res, {
      statusCode: import_http_status10.default.OK,
      success: true,
      message: "Property Updated Successfully",
      data: result
    });
  }
);
var deleteProperty2 = catchAsync(
  async (req, res, next) => {
    const propertyId = req.params.propertyId;
    const userId = req.user?.userId;
    const result = await OwnerServices.deleteProperty(propertyId, userId);
    sendResponse(res, {
      statusCode: import_http_status10.default.OK,
      success: true,
      message: "Property Deleted Successfully",
      data: result
    });
  }
);
var OwnerController = {
  createProperty: createProperty2,
  getMyProperties: getMyProperties2,
  updateProperty: updateProperty2,
  deleteProperty: deleteProperty2
};

// src/app/lib/multer.ts
var import_multer = __toESM(require("multer"), 1);
var storage = import_multer.default.memoryStorage();
var upload = (0, import_multer.default)({ storage });

// src/app/module/owner/owner.validation.ts
var import_zod3 = __toESM(require("zod"), 1);
var createPropertyValidationSchema = import_zod3.default.object({
  title: import_zod3.default.string({
    message: "Title is required"
  }).trim().min(3, "Title must be at least 3 characters long"),
  description: import_zod3.default.string().trim().optional(),
  propertyType: import_zod3.default.enum([
    PropertyType.HOUSE,
    PropertyType.APARTMENT,
    PropertyType.HOSTEL,
    PropertyType.ROOM
  ], {
    message: "Invalid property type"
  }).optional(),
  address: import_zod3.default.string({
    message: "Address is required"
  }).trim().min(5, "Address must be at least 5 characters long"),
  city: import_zod3.default.string().trim().optional(),
  area: import_zod3.default.string().trim().optional(),
  latitude: import_zod3.default.coerce.number({
    message: "Latitude must be a number"
  }).optional(),
  longitude: import_zod3.default.coerce.number({
    message: "Longitude must be a number"
  }).optional(),
  totalRooms: import_zod3.default.coerce.number({ message: "TotalRooms must be a number" }).optional()
});
var updatePropertyValidationSchema = import_zod3.default.object({
  title: import_zod3.default.string().trim().min(3, "Title must be at least 3 characters long").optional(),
  description: import_zod3.default.string().trim().optional(),
  propertyType: import_zod3.default.enum([
    PropertyType.HOUSE,
    PropertyType.APARTMENT,
    PropertyType.HOSTEL,
    PropertyType.ROOM
  ], {
    message: "Invalid property type"
  }).optional(),
  address: import_zod3.default.string().trim().min(5, "Address must be at least 5 characters long").optional(),
  city: import_zod3.default.string().trim().optional(),
  area: import_zod3.default.string().trim().optional(),
  latitude: import_zod3.default.coerce.number({
    message: "Latitude must be a number"
  }).optional(),
  longitude: import_zod3.default.coerce.number({
    message: "Longitude must be a number"
  }).optional(),
  totalRooms: import_zod3.default.coerce.number({ message: "TotalRooms must be a number" }).optional()
});

// src/app/module/owner/owner.route.ts
var router3 = (0, import_express3.Router)();
router3.post(
  "/property",
  upload.single("image"),
  validationRequest(createPropertyValidationSchema),
  auth(Role.OWNER),
  OwnerController.createProperty
);
router3.get(
  "/my-properties",
  auth(Role.OWNER),
  OwnerController.getMyProperties
);
router3.patch(
  "/property/:propertyId",
  upload.single("image"),
  validationRequest(updatePropertyValidationSchema),
  auth(Role.OWNER),
  OwnerController.updateProperty
);
router3.delete("/property/:propertyId", auth(Role.OWNER), OwnerController.deleteProperty);
var OwnerRoutes = router3;

// src/app/module/property/property.route.ts
var import_express4 = require("express");

// src/app/module/property/property.services.ts
var import_http_status11 = __toESM(require("http-status"), 1);
var getAllProperties = async (query) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";
  const andConditions = [
    {
      isDeleted: false
    },
    {
      status: PropertyStatus.ACTIVE
    }
  ];
  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        },
        {
          address: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        },
        {
          city: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        },
        {
          area: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.propertyType) {
    andConditions.push({
      propertyType: query.propertyType
    });
  }
  if (query.city) {
    andConditions.push({
      city: {
        equals: query.city,
        mode: "insensitive"
      }
    });
  }
  if (query.area) {
    andConditions.push({
      area: {
        equals: query.area,
        mode: "insensitive"
      }
    });
  }
  if (query.minRooms) {
    andConditions.push({
      totalRooms: {
        gte: Number(query.minRooms)
      }
    });
  }
  if (query.maxRooms) {
    andConditions.push({
      totalRooms: {
        lte: Number(query.maxRooms)
      }
    });
  }
  const allProperties = await prisma.property.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder
    },
    include: {
      owner: true
    }
  });
  const totalPropertyCount = await prisma.property.count({
    where: {
      AND: andConditions
    }
  });
  return {
    data: allProperties,
    meta: {
      page,
      limit,
      total: totalPropertyCount,
      totalPages: Math.ceil(totalPropertyCount / limit)
    }
  };
};
var getPropertyById = async (propertyId) => {
  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
      isDeleted: false,
      status: "ACTIVE"
    },
    include: {
      owner: true,
      rooms: true
    }
  });
  if (!property) {
    throw new AppError(
      import_http_status11.default.NOT_FOUND,
      "Property Not Found"
    );
  }
  return property;
};
var PropertyServices = {
  getAllProperties,
  getPropertyById
};

// src/app/module/property/property.controller.ts
var import_http_status12 = __toESM(require("http-status"), 1);
var getAllProperties2 = catchAsync(async (req, res, next) => {
  const result = await PropertyServices.getAllProperties(req.query);
  sendResponse(res, {
    statusCode: import_http_status12.default.OK,
    success: true,
    message: "Properties Retrieved Successfully",
    data: result
  });
});
var getPropertyById2 = catchAsync(
  async (req, res, next) => {
    const propertyId = req.params.id;
    const result = await PropertyServices.getPropertyById(propertyId);
    sendResponse(res, {
      statusCode: import_http_status12.default.OK,
      success: true,
      message: "Property Retrieved Successfully",
      data: result
    });
  }
);
var PropertyController = {
  getAllProperties: getAllProperties2,
  getPropertyById: getPropertyById2
};

// src/app/module/property/property.route.ts
var router4 = (0, import_express4.Router)();
router4.get("/", PropertyController.getAllProperties);
router4.get("/:id", PropertyController.getPropertyById);
var PropertyRouers = router4;

// src/app/module/room/room.route.ts
var import_express5 = require("express");

// src/app/module/room/room.controller.ts
var import_http_status14 = __toESM(require("http-status"), 1);

// src/app/module/room/room.services.ts
var import_http_status13 = __toESM(require("http-status"), 1);
var createRoom = async (propertyId, userId, payload) => {
  const owner = await prisma.owner.findUnique({
    where: {
      userId
    }
  });
  if (!owner) {
    throw new AppError(
      import_http_status13.default.NOT_FOUND,
      "Owner Profile Not Found"
    );
  }
  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
      ownerId: owner.id,
      isDeleted: false
    }
  });
  if (!property) {
    throw new AppError(
      import_http_status13.default.NOT_FOUND,
      "Property Not Found or You are not the owner"
    );
  }
  const existingRoom = await prisma.room.findUnique({
    where: {
      propertyId_roomNumber: {
        propertyId,
        roomNumber: payload.roomNumber
      }
    }
  });
  if (existingRoom && !existingRoom.isDeleted) {
    throw new AppError(
      import_http_status13.default.CONFLICT,
      "Room number already exists in this property"
    );
  }
  const room = await prisma.room.create({
    data: {
      propertyId,
      roomNumber: payload.roomNumber,
      title: payload.title,
      description: payload.description,
      roomType: payload.roomType,
      amount: payload.amount,
      securityDeposit: payload.securityDeposit,
      capacity: payload.capacity ?? 1
    },
    include: {
      property: true
    }
  });
  await prisma.property.update({
    where: {
      id: propertyId
    },
    data: {
      totalRooms: {
        increment: 1
      }
    }
  });
  return room;
};
var getPropertyRooms = async (propertyId) => {
  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
      isDeleted: false
    }
  });
  if (!property) {
    throw new AppError(
      import_http_status13.default.NOT_FOUND,
      "Property Not Found"
    );
  }
  const rooms = await prisma.room.findMany({
    where: {
      propertyId,
      isDeleted: false
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return rooms;
};
var getRoomById = async (roomId) => {
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
      isDeleted: false
    },
    include: {
      property: true
    }
  });
  if (!room) {
    throw new AppError(
      import_http_status13.default.NOT_FOUND,
      "Room Not Found"
    );
  }
  return room;
};
var updateRoom = async (roomId, userId, payload) => {
  const owner = await prisma.owner.findUnique({
    where: {
      userId
    }
  });
  if (!owner) {
    throw new AppError(
      import_http_status13.default.NOT_FOUND,
      "Owner Profile Not Found"
    );
  }
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
      isDeleted: false,
      property: {
        ownerId: owner.id,
        isDeleted: false
      }
    }
  });
  if (!room) {
    throw new AppError(
      import_http_status13.default.NOT_FOUND,
      "Room Not Found or You are not the owner"
    );
  }
  if (payload.roomNumber && payload.roomNumber !== room.roomNumber) {
    const existingRoom = await prisma.room.findUnique({
      where: {
        propertyId_roomNumber: {
          propertyId: room.propertyId,
          roomNumber: payload.roomNumber
        }
      }
    });
    if (existingRoom && !existingRoom.isDeleted) {
      throw new AppError(
        import_http_status13.default.CONFLICT,
        "Room number already exists in this property"
      );
    }
  }
  const updatedRoom = await prisma.room.update({
    where: {
      id: roomId
    },
    data: {
      ...payload
    },
    include: {
      property: true
    }
  });
  return updatedRoom;
};
var deleteRoom = async (roomId, userId) => {
  const owner = await prisma.owner.findUnique({
    where: {
      userId
    }
  });
  if (!owner) {
    throw new AppError(
      import_http_status13.default.NOT_FOUND,
      "Owner Profile Not Found"
    );
  }
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
      isDeleted: false,
      property: {
        ownerId: owner.id,
        isDeleted: false
      }
    }
  });
  if (!room) {
    throw new AppError(
      import_http_status13.default.NOT_FOUND,
      "Room Not Found or You are not the owner"
    );
  }
  await prisma.room.update({
    where: {
      id: roomId
    },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
  await prisma.property.update({
    where: {
      id: room.propertyId
    },
    data: {
      totalRooms: {
        decrement: 1
      }
    }
  });
  return null;
};
var updateRoomAvailability = async (roomId, userId, availability) => {
  const owner = await prisma.owner.findUnique({
    where: {
      userId
    }
  });
  if (!owner) {
    throw new AppError(
      import_http_status13.default.NOT_FOUND,
      "Owner Profile Not Found"
    );
  }
  const room = await prisma.room.findFirst({
    where: {
      id: roomId,
      isDeleted: false,
      property: {
        ownerId: owner.id,
        isDeleted: false
      }
    }
  });
  if (!room) {
    throw new AppError(
      import_http_status13.default.NOT_FOUND,
      "Room Not Found or You are not the owner"
    );
  }
  const updatedRoom = await prisma.room.update({
    where: {
      id: roomId
    },
    data: {
      availability
    }
  });
  return updatedRoom;
};
var RoomServices = {
  createRoom,
  getPropertyRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  updateRoomAvailability
};

// src/app/module/room/room.controller.ts
var createRoom2 = catchAsync(async (req, res, next) => {
  const propertyId = req.params.propertyId;
  const userId = req.user?.userId;
  const result = await RoomServices.createRoom(propertyId, userId, req.body);
  sendResponse(res, {
    statusCode: import_http_status14.default.CREATED,
    success: true,
    message: "Room Created Successfully",
    data: result
  });
});
var getPropertyRooms2 = catchAsync(async (req, res, next) => {
  const propertyId = req.params.propertyId;
  const result = await RoomServices.getPropertyRooms(propertyId);
  sendResponse(res, {
    statusCode: import_http_status14.default.OK,
    success: true,
    message: "Property Rooms Retrieved Successfully",
    data: result
  });
});
var getRoomById2 = catchAsync(async (req, res, next) => {
  const roomId = req.params.id;
  const result = await RoomServices.getRoomById(roomId);
  sendResponse(res, {
    statusCode: import_http_status14.default.OK,
    success: true,
    message: "Room Retrieved Successfully",
    data: result
  });
});
var updateRoom2 = catchAsync(async (req, res, next) => {
  const roomId = req.params.id;
  const userId = req.user?.userId;
  const result = await RoomServices.updateRoom(roomId, userId, req.body);
  sendResponse(res, {
    statusCode: import_http_status14.default.OK,
    success: true,
    message: "Room Updated Successfully",
    data: result
  });
});
var deleteRoom2 = catchAsync(async (req, res, next) => {
  const roomId = req.params.id;
  const userId = req.user?.userId;
  const result = await RoomServices.deleteRoom(
    roomId,
    userId
  );
  sendResponse(res, {
    statusCode: import_http_status14.default.OK,
    success: true,
    message: "Room Deleted Successfully",
    data: result
  });
});
var updateRoomAvailability2 = catchAsync(async (req, res, next) => {
  const roomId = req.params.id;
  const userId = req.user?.userId;
  const result = await RoomServices.updateRoomAvailability(roomId, userId, req.body.availability);
  sendResponse(res, {
    statusCode: import_http_status14.default.OK,
    success: true,
    message: "Room Availability Updated Successfully",
    data: result
  });
});
var RoomController = {
  createRoom: createRoom2,
  getPropertyRooms: getPropertyRooms2,
  getRoomById: getRoomById2,
  updateRoom: updateRoom2,
  deleteRoom: deleteRoom2,
  updateRoomAvailability: updateRoomAvailability2
};

// src/app/module/room/room.validation.ts
var import_zod4 = __toESM(require("zod"), 1);
var createRoomValidationSchema = import_zod4.default.object({
  roomNumber: import_zod4.default.string({
    message: "Room number is required"
  }).trim().min(1, "Room number is required"),
  title: import_zod4.default.string().trim().optional(),
  description: import_zod4.default.string().trim().optional(),
  roomType: import_zod4.default.enum([
    RoomType.SINGLE,
    RoomType.DOUBLE,
    RoomType.SHARED
  ], {
    message: "Invalid room type"
  }).optional(),
  amount: import_zod4.default.coerce.number({
    message: "Amount must be a number"
  }).positive("Amount must be greater than 0"),
  securityDeposit: import_zod4.default.coerce.number({
    message: "Security deposit must be a number"
  }).nonnegative("Security deposit cannot be negative").optional(),
  capacity: import_zod4.default.coerce.number({
    message: "Capacity must be a number"
  }).int("Capacity must be an integer").positive("Capacity must be greater than 0").optional()
});
var updateRoomValidationSchema = import_zod4.default.object({
  roomNumber: import_zod4.default.string().trim().min(1, "Room number cannot be empty").optional(),
  title: import_zod4.default.string().trim().optional(),
  description: import_zod4.default.string().trim().optional(),
  roomType: import_zod4.default.enum([
    RoomType.SINGLE,
    RoomType.DOUBLE,
    RoomType.SHARED
  ], {
    message: "Invalid room type"
  }).optional(),
  amount: import_zod4.default.coerce.number({ message: "Amount must be a number" }).positive("Amount must be greater than 0").optional(),
  securityDeposit: import_zod4.default.coerce.number({ message: "Security deposit must be a number" }).nonnegative("Security deposit cannot be negative").optional(),
  capacity: import_zod4.default.coerce.number({ message: "Capacity must be a number" }).int("Capacity must be an integer").positive("Capacity must be greater than 0").optional()
});
var updateRoomAvailabilityValidationSchema = import_zod4.default.object({
  availability: import_zod4.default.enum([
    RoomAvailability.AVAILABLE,
    RoomAvailability.OCCUPIED,
    RoomAvailability.RESERVED
  ], {
    message: "Invalid room availability"
  })
});

// src/app/module/room/room.route.ts
var router5 = (0, import_express5.Router)();
router5.post(
  "/property/:propertyId",
  auth(Role.OWNER),
  validationRequest(createRoomValidationSchema),
  RoomController.createRoom
);
router5.get("/property/:propertyId", RoomController.getPropertyRooms);
router5.get("/:id", RoomController.getRoomById);
router5.patch(
  "/:id",
  auth(Role.OWNER),
  validationRequest(updateRoomValidationSchema),
  RoomController.updateRoom
);
router5.delete("/:id", auth(Role.OWNER), RoomController.deleteRoom);
router5.patch(
  "/availability/:id",
  auth(Role.OWNER),
  validationRequest(updateRoomAvailabilityValidationSchema),
  RoomController.updateRoomAvailability
);
var RoomRoutes = router5;

// src/app/module/roommate/roommate.route.ts
var import_express6 = require("express");

// src/app/module/roommate/roommate.validation.ts
var import_zod5 = __toESM(require("zod"), 1);
var createPreferenceValidationSchema = import_zod5.default.object({
  preferredGender: import_zod5.default.enum([
    Gender.MALE,
    Gender.FEMALE,
    Gender.OTHER
  ], {
    message: "Invalid preferred gender"
  }).optional(),
  minBudget: import_zod5.default.coerce.number({
    message: "Minimum budget must be a number"
  }).nonnegative("Minimum budget cannot be negative").optional(),
  maxBudget: import_zod5.default.coerce.number({
    message: "Maximum budget must be a number"
  }).positive("Maximum budget must be greater than 0").optional(),
  preferredLocation: import_zod5.default.string().trim().optional(),
  smokingAllowed: import_zod5.default.boolean().optional(),
  petsAllowed: import_zod5.default.boolean().optional()
});
var updatePreferenceValidationSchema = import_zod5.default.object({
  preferredGender: import_zod5.default.enum([
    Gender.MALE,
    Gender.FEMALE,
    Gender.OTHER
  ], {
    message: "Invalid preferred gender"
  }).optional(),
  minBudget: import_zod5.default.coerce.number({
    message: "Minimum budget must be a number"
  }).nonnegative("Minimum budget cannot be negative").optional(),
  maxBudget: import_zod5.default.coerce.number({
    message: "Maximum budget must be a number"
  }).positive("Maximum budget must be greater than 0").optional(),
  preferredLocation: import_zod5.default.string().trim().optional(),
  smokingAllowed: import_zod5.default.boolean().optional(),
  petsAllowed: import_zod5.default.boolean().optional()
});

// src/app/module/roommate/roommate.services.ts
var import_http_status15 = __toESM(require("http-status"), 1);
var createPreference = async (userId, payload) => {
  const tenant = await prisma.tenant.findUnique({
    where: {
      userId,
      isDeleted: false
    }
  });
  if (!tenant) {
    throw new AppError(
      import_http_status15.default.NOT_FOUND,
      "Tenant Profile Not Found"
    );
  }
  const existingPreference = await prisma.roommate.findUnique({
    where: {
      tenantId: tenant.id
    }
  });
  if (existingPreference) {
    throw new AppError(
      import_http_status15.default.CONFLICT,
      "Roommate Preference Already Exists"
    );
  }
  const preference = await prisma.roommate.create({
    data: {
      tenantId: tenant.id,
      gender: payload.gender,
      minBudget: payload.minBudget,
      maxBudget: payload.maxBudget,
      preferredLocation: payload.preferredLocation,
      smokingAllowed: payload.smokingAllowed,
      petsAllowed: payload.petsAllowed
    }
  });
  return preference;
};
var getMyPreference = async (userId) => {
  const tenant = await prisma.tenant.findUnique({
    where: {
      userId
    }
  });
  if (!tenant) {
    throw new AppError(
      import_http_status15.default.NOT_FOUND,
      "Tenant Profile Not Found"
    );
  }
  const preference = await prisma.roommate.findUnique({
    where: {
      tenantId: tenant.id
    }
  });
  if (!preference) {
    throw new AppError(
      import_http_status15.default.NOT_FOUND,
      "Roommate Preference Not Found"
    );
  }
  return preference;
};
var updatePreference = async (userId, payload) => {
  const tenant = await prisma.tenant.findUnique({
    where: {
      userId
    }
  });
  if (!tenant) {
    throw new AppError(
      import_http_status15.default.NOT_FOUND,
      "Tenant Profile Not Found"
    );
  }
  const existingPreference = await prisma.roommate.findUnique({
    where: {
      tenantId: tenant.id
    }
  });
  if (!existingPreference) {
    throw new AppError(
      import_http_status15.default.NOT_FOUND,
      "Roommate Preference Not Found"
    );
  }
  const updatedPreference = await prisma.roommate.update({
    where: {
      tenantId: tenant.id
    },
    data: {
      ...payload
    }
  });
  return updatedPreference;
};
var findMatches = async (userId) => {
  const tenant = await prisma.tenant.findUnique({
    where: {
      userId,
      isDeleted: false
    }
  });
  if (!tenant) {
    throw new AppError(
      import_http_status15.default.NOT_FOUND,
      "Tenant Profile Not Found"
    );
  }
  const preference = await prisma.roommate.findUnique({
    where: {
      tenantId: tenant.id
    }
  });
  if (!preference) {
    throw new AppError(
      import_http_status15.default.NOT_FOUND,
      "Please create your roommate preference first"
    );
  }
  const matches = await prisma.roommate.findMany({
    where: {
      tenantId: {
        not: tenant.id
      },
      gender: preference.gender,
      smokingAllowed: preference.smokingAllowed,
      petsAllowed: preference.petsAllowed
    },
    include: {
      tenant: true
    }
  });
  return matches;
};
var getTenantProfile = async (tenantId) => {
  const tenant = await prisma.tenant.findUnique({
    where: {
      id: tenantId,
      isDeleted: false
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          imageUrl: true,
          imagePublicId: true,
          isEmailVerified: true
        }
      },
      roommate: true
    }
  });
  if (!tenant) {
    throw new AppError(
      import_http_status15.default.NOT_FOUND,
      "Tenant Not Found"
    );
  }
  return tenant;
};
var RoommateServices = {
  createPreference,
  getMyPreference,
  updatePreference,
  findMatches,
  getTenantProfile
};

// src/app/module/roommate/roommate.controller.ts
var import_http_status16 = __toESM(require("http-status"), 1);
var createPreference2 = catchAsync(async (req, res, next) => {
  const userId = req.user?.userId;
  const result = await RoommateServices.createPreference(userId, req.body);
  sendResponse(res, {
    statusCode: import_http_status16.default.CREATED,
    success: true,
    message: "Roommate Preference Created Successfully",
    data: result
  });
});
var getMyPreference2 = catchAsync(async (req, res, next) => {
  const userId = req.user?.userId;
  const result = await RoommateServices.getMyPreference(userId);
  sendResponse(res, {
    statusCode: import_http_status16.default.OK,
    success: true,
    message: "My Roommate Preference Retrieved Successfully",
    data: result
  });
});
var updatePreference2 = catchAsync(async (req, res, next) => {
  const userId = req.user?.userId;
  const result = await RoommateServices.updatePreference(userId, req.body);
  sendResponse(res, {
    statusCode: import_http_status16.default.OK,
    success: true,
    message: "Roommate Preference Updated Successfully",
    data: result
  });
});
var findMatches2 = catchAsync(async (req, res, next) => {
  const userId = req.user?.userId;
  const result = await RoommateServices.findMatches(userId);
  sendResponse(res, {
    statusCode: import_http_status16.default.OK,
    success: true,
    message: "Roommate Matches Retrieved Successfully",
    data: result
  });
});
var getTenantProfile2 = catchAsync(async (req, res, next) => {
  const tenantId = req.params.id;
  const result = await RoommateServices.getTenantProfile(tenantId);
  sendResponse(res, {
    statusCode: import_http_status16.default.OK,
    success: true,
    message: "Tenant Profile Retrieved Successfully",
    data: result
  });
});
var RoommateController = {
  createPreference: createPreference2,
  getMyPreference: getMyPreference2,
  updatePreference: updatePreference2,
  findMatches: findMatches2,
  getTenantProfile: getTenantProfile2
};

// src/app/module/roommate/roommate.route.ts
var router6 = (0, import_express6.Router)();
router6.post(
  "/preferences",
  auth(Role.TENANT),
  validationRequest(createPreferenceValidationSchema),
  RoommateController.createPreference
);
router6.get("/preferences/me", auth(Role.TENANT), RoommateController.getMyPreference);
router6.patch(
  "/preferences/update",
  auth(Role.TENANT),
  validationRequest(updatePreferenceValidationSchema),
  RoommateController.updatePreference
);
router6.get("/matches", auth(Role.TENANT), RoommateController.findMatches);
router6.get("/:id", auth(Role.TENANT), RoommateController.getTenantProfile);
var RoommateRouters = router6;

// src/app/module/rental/rental.route.ts
var import_express7 = require("express");

// src/app/module/rental/rental.validation.ts
var import_zod6 = __toESM(require("zod"), 1);
var createApplicationValidationSchema = import_zod6.default.object({
  roomId: import_zod6.default.string({ message: "Room ID is required" }).min(1, "Room ID is required"),
  message: import_zod6.default.string().trim().optional(),
  proposedMoveIn: import_zod6.default.string().datetime("Invalid move-in date").optional()
});
var updateApplicationStatusValidationSchema = import_zod6.default.object({
  status: import_zod6.default.enum(
    [
      ApplicationStatus.APPROVED,
      ApplicationStatus.REJECTED,
      ApplicationStatus.CANCELLED,
      ApplicationStatus.PENDING
    ],
    {
      message: "Invalid application status"
    }
  )
});

// src/app/module/rental/rental.controller.ts
var import_http_status18 = __toESM(require("http-status"), 1);

// src/app/module/rental/rental.services.ts
var import_http_status17 = __toESM(require("http-status"), 1);
var createApplication = async (userId, payload) => {
  const tenant = await prisma.tenant.findUnique({
    where: {
      userId
    }
  });
  if (!tenant) {
    throw new AppError(
      import_http_status17.default.NOT_FOUND,
      "Tenant Profile Not Found"
    );
  }
  const room = await prisma.room.findFirst({
    where: {
      id: payload.roomId,
      isDeleted: false
    }
  });
  if (!room) {
    throw new AppError(import_http_status17.default.NOT_FOUND, "Room Not Found");
  }
  if (room.availability !== "AVAILABLE") {
    throw new AppError(
      import_http_status17.default.BAD_REQUEST,
      "Room is not available"
    );
  }
  const existingApplication = await prisma.rental.findFirst({
    where: {
      tenantId: tenant.id,
      roomId: room.id,
      status: {
        not: "REJECTED"
      }
    }
  });
  if (existingApplication) {
    throw new AppError(
      import_http_status17.default.CONFLICT,
      "You have already applied for this room"
    );
  }
  const application = await prisma.rental.create({
    data: {
      tenantId: tenant.id,
      propertyId: room.propertyId,
      roomId: room.id,
      message: payload.message,
      proposedMoveIn: payload.proposedMoveIn ? new Date(payload.proposedMoveIn) : void 0,
      status: ApplicationStatus.PENDING
    }
  });
  return application;
};
var getMyApplications = async (userId) => {
  const tenant = await prisma.tenant.findUnique({
    where: {
      userId
    }
  });
  if (!tenant) {
    throw new AppError(
      import_http_status17.default.NOT_FOUND,
      "Tenant Profile Not Found"
    );
  }
  const applications = await prisma.rental.findMany({
    where: {
      tenantId: tenant.id
    },
    include: {
      property: true,
      room: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return applications;
};
var getApplicationById = async (userId, applicationId) => {
  const tenant = await prisma.tenant.findUnique({
    where: {
      userId
    }
  });
  if (!tenant) {
    throw new AppError(
      import_http_status17.default.NOT_FOUND,
      "Tenant Profile Not Found"
    );
  }
  const application = await prisma.rental.findFirst({
    where: {
      id: applicationId,
      tenantId: tenant.id
    },
    include: {
      property: true,
      room: true
    }
  });
  if (!application) {
    throw new AppError(
      import_http_status17.default.NOT_FOUND,
      "Application Not Found"
    );
  }
  return application;
};
var cancelApplication = async (userId, applicationId) => {
  const tenant = await prisma.tenant.findUnique({
    where: {
      userId
    }
  });
  if (!tenant) {
    throw new AppError(
      import_http_status17.default.NOT_FOUND,
      "Tenant Profile Not Found"
    );
  }
  const application = await prisma.rental.findFirst({
    where: {
      id: applicationId,
      tenantId: tenant.id
    }
  });
  if (!application) {
    throw new AppError(
      import_http_status17.default.NOT_FOUND,
      "Application Not Found"
    );
  }
  if (application.status !== "PENDING") {
    throw new AppError(
      import_http_status17.default.BAD_REQUEST,
      "Only pending applications can be cancelled"
    );
  }
  const cancelledApplication = await prisma.rental.update({
    where: {
      id: applicationId
    },
    data: {
      status: "CANCELLED"
    }
  });
  return cancelledApplication;
};
var getPropertyApplications = async (userId, propertyId) => {
  const owner = await prisma.owner.findUnique({
    where: {
      userId
    }
  });
  if (!owner) {
    throw new AppError(
      import_http_status17.default.NOT_FOUND,
      "Owner Profile Not Found"
    );
  }
  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
      ownerId: owner.id,
      isDeleted: false
    }
  });
  if (!property) {
    throw new AppError(
      import_http_status17.default.NOT_FOUND,
      "Property Not Found or You are not the owner"
    );
  }
  const applications = await prisma.rental.findMany({
    where: {
      propertyId
    },
    include: {
      tenant: true,
      room: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return applications;
};
var updateApplicationStatus = async (userId, applicationId, payload) => {
  const owner = await prisma.owner.findUnique({
    where: {
      userId
    }
  });
  if (!owner) {
    throw new AppError(
      import_http_status17.default.NOT_FOUND,
      "Owner Profile Not Found"
    );
  }
  const application = await prisma.rental.findFirst({
    where: {
      id: applicationId,
      property: {
        ownerId: owner.id,
        isDeleted: false
      }
    }
  });
  if (!application) {
    throw new AppError(
      import_http_status17.default.NOT_FOUND,
      "Application Not Found or You are not the owner"
    );
  }
  console.log(payload);
  const updatedApplication = await prisma.rental.update({
    where: {
      id: applicationId
    },
    data: {
      status: payload
    }
  });
  return updatedApplication;
};
var RentalServices = {
  createApplication,
  getMyApplications,
  getApplicationById,
  cancelApplication,
  getPropertyApplications,
  updateApplicationStatus
};

// src/app/module/rental/rental.controller.ts
var createApplication2 = catchAsync(async (req, res, next) => {
  const userId = req.user?.userId;
  const result = await RentalServices.createApplication(userId, req.body);
  sendResponse(res, {
    statusCode: import_http_status18.default.CREATED,
    success: true,
    message: "Rental Application Created Successfully",
    data: result
  });
});
var getMyApplications2 = catchAsync(async (req, res, next) => {
  const userId = req.user?.userId;
  const result = await RentalServices.getMyApplications(userId);
  sendResponse(res, {
    statusCode: import_http_status18.default.OK,
    success: true,
    message: "My Applications Retrieved Successfully",
    data: result
  });
});
var getApplicationById2 = catchAsync(async (req, res, next) => {
  const userId = req.user?.userId;
  const applicationId = req.params.id;
  const result = await RentalServices.getApplicationById(userId, applicationId);
  sendResponse(res, {
    statusCode: import_http_status18.default.OK,
    success: true,
    message: "Application Retrieved Successfully",
    data: result
  });
});
var cancelApplication2 = catchAsync(async (req, res, next) => {
  const userId = req.user?.userId;
  const applicationId = req.params.id;
  const result = await RentalServices.cancelApplication(userId, applicationId);
  sendResponse(res, {
    statusCode: import_http_status18.default.OK,
    success: true,
    message: "Application Cancelled Successfully",
    data: result
  });
});
var getPropertyApplications2 = catchAsync(async (req, res, next) => {
  const userId = req.user?.userId;
  const propertyId = req.params.id;
  const result = await RentalServices.getPropertyApplications(userId, propertyId);
  sendResponse(res, {
    statusCode: import_http_status18.default.OK,
    success: true,
    message: "Property Applications Retrieved Successfully",
    data: result
  });
});
var updateApplicationStatus2 = catchAsync(async (req, res, next) => {
  const userId = req.user?.userId;
  const applicationId = req.params.id;
  const result = await RentalServices.updateApplicationStatus(userId, applicationId, req.body.status);
  sendResponse(res, {
    statusCode: import_http_status18.default.OK,
    success: true,
    message: "Application Status Updated Successfully",
    data: result
  });
});
var RentalController = {
  createApplication: createApplication2,
  getMyApplications: getMyApplications2,
  getApplicationById: getApplicationById2,
  cancelApplication: cancelApplication2,
  getPropertyApplications: getPropertyApplications2,
  updateApplicationStatus: updateApplicationStatus2
};

// src/app/module/rental/rental.route.ts
var router7 = (0, import_express7.Router)();
router7.post(
  "/applications",
  auth(Role.TENANT),
  validationRequest(createApplicationValidationSchema),
  RentalController.createApplication
);
router7.get("/applications/me", auth(Role.TENANT), RentalController.getMyApplications);
router7.get("/applications/:id", auth(Role.TENANT), RentalController.getApplicationById);
router7.patch("/applications/cancel/:id", auth(Role.TENANT), RentalController.cancelApplication);
router7.get("/property/applications/:id", auth(Role.OWNER), RentalController.getPropertyApplications);
router7.patch(
  "/applications/status/:id",
  auth(Role.OWNER),
  validationRequest(updateApplicationStatusValidationSchema),
  RentalController.updateApplicationStatus
);
var RentalRouters = router7;

// src/app/module/payment/payment.route.ts
var import_express8 = require("express");

// src/app/module/payment/payment.controller.ts
var import_http_status21 = __toESM(require("http-status"), 1);

// src/app/module/payment/payment.services.ts
var import_http_status20 = __toESM(require("http-status"), 1);

// src/app/lib/bkash.ts
var import_http_status19 = __toESM(require("http-status"), 1);
var getBkashIdToken = async () => {
  try {
    const idTokenKey = "bkash:idToken";
    const refreshTokenKey = "bkash:refreshToken";
    let bkashIdToken = await redisClient.get(idTokenKey);
    const bkashIdTokenTTL = await redisClient.ttl(idTokenKey);
    const bkashRefreshToken = await redisClient.get(refreshTokenKey);
    const bkashRefreshTokenTTL = await redisClient.ttl(refreshTokenKey);
    if ((bkashIdTokenTTL <= 600 || !bkashIdToken) && bkashRefreshToken && bkashRefreshTokenTTL > 600) {
      const refreshTokenResponse = await fetch(`${config_default.bkash_base_url}/tokenized/checkout/token/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: config_default.bkash_username,
          password: config_default.bkash_password
        },
        body: JSON.stringify(
          {
            app_key: config_default.bkash_app_key,
            app_secret: config_default.bkash_app_secret,
            refresh_token: bkashRefreshToken
          }
        )
      });
      const bkashRefreshTokenResult = await refreshTokenResponse.json();
      bkashIdToken = bkashRefreshTokenResult.id_token;
      await redisClient.set(idTokenKey, bkashIdToken, {
        expiration: {
          type: "EX",
          value: 60 * 60
        }
      });
      return bkashIdToken;
    }
    if (bkashIdTokenTTL > 600) {
      return bkashIdToken;
    }
    const response = await fetch(`${config_default.bkash_base_url}/tokenized/checkout/token/grant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        username: config_default.bkash_username,
        password: config_default.bkash_password
      },
      body: JSON.stringify(
        {
          app_key: config_default.bkash_app_key,
          app_secret: config_default.bkash_app_secret
        }
      )
    });
    if (!response.ok) {
      throw new AppError(import_http_status19.default.BAD_GATEWAY, "Bkash Access Token Grant Failed");
    }
    const result = await response.json();
    await redisClient.set(idTokenKey, result.id_token, {
      expiration: {
        type: "EX",
        value: 60 * 60
      }
    });
    await redisClient.set(refreshTokenKey, result.refresh_token, {
      expiration: {
        type: "EX",
        value: 60 * 60 * 24 * 28
      }
    });
    bkashIdToken = result.id_token;
    return bkashIdToken;
  } catch (error) {
    throw new AppError(import_http_status19.default.BAD_GATEWAY, error.message);
  }
};

// src/app/module/payment/payment.services.ts
var createPayment = async (payload, user) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const rental = await tx.rental.findUnique({
      where: {
        id: payload.rentalId
      },
      include: {
        room: true,
        property: true,
        tenant: true
      }
    });
    if (!rental) {
      throw new AppError(
        import_http_status20.default.NOT_FOUND,
        "Rental Application Not Found"
      );
    }
    if (rental.tenant.userId !== user.userId) {
      throw new AppError(
        import_http_status20.default.FORBIDDEN,
        "You are not allowed to pay for this application"
      );
    }
    if (rental.status !== "APPROVED") {
      throw new AppError(
        import_http_status20.default.BAD_REQUEST,
        "Only approved applications can be paid"
      );
    }
    const existingPayment = await tx.payment.findUnique({
      where: {
        rentalId: rental.id
      }
    });
    if (existingPayment?.status === PaymentStatus.PAID) {
      throw new AppError(
        import_http_status20.default.BAD_REQUEST,
        "Payment Already Completed"
      );
    }
    const bkashIdToken = await getBkashIdToken();
    if (!bkashIdToken) {
      throw new AppError(
        import_http_status20.default.BAD_GATEWAY,
        "No Bkash Access Token Found"
      );
    }
    const amount = rental.room.amount.toString();
    const merchantInvoiceNumber = `${rental.id}-${Date.now()}`;
    const bkashPaymentCreateResponse = await fetch(
      `${config_default.bkash_base_url}/tokenized/checkout/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: bkashIdToken,
          "X-App-Key": config_default.bkash_app_key
        },
        body: JSON.stringify({
          mode: "0011",
          payerReference: user.email,
          callbackURL: `${config_default.bkash_callBack_url}/payments/bkash/callback`,
          amount,
          currency: "BDT",
          intent: "sale",
          merchantInvoiceNumber
        })
      }
    );
    const bkashCreatePaymentResult = await bkashPaymentCreateResponse.json();
    if (bkashCreatePaymentResult.statusCode !== "0000") {
      throw new AppError(
        import_http_status20.default.BAD_GATEWAY,
        bkashCreatePaymentResult.statusMessage || "bKash Payment Creation Failed"
      );
    }
    let payment;
    if (existingPayment) {
      payment = await tx.payment.update({
        where: {
          id: existingPayment.id
        },
        data: {
          amount: rental.room.amount,
          currency: "BDT",
          merchantInvoiceNumber,
          bkashPaymentId: bkashCreatePaymentResult.paymentID,
          payerReference: user.email,
          gatewayResponse: bkashCreatePaymentResult,
          status: PaymentStatus.UNPAID,
          paidAt: null
        }
      });
    } else {
      payment = await tx.payment.create({
        data: {
          userId: user.userId,
          propertyId: rental.propertyId,
          roomId: rental.roomId,
          rentalId: rental.id,
          amount: rental.room.amount,
          currency: "BDT",
          merchantInvoiceNumber,
          bkashPaymentId: bkashCreatePaymentResult.paymentID,
          payerReference: user.email,
          gatewayResponse: bkashCreatePaymentResult,
          status: PaymentStatus.UNPAID
        }
      });
    }
    return {
      paymentId: payment.id,
      paymentUrl: bkashCreatePaymentResult.bkashURL
    };
  });
  return transactionResult;
};
var bkashCallback = async (query) => {
  const transactionResult = await prisma.$transaction(
    async (tx) => {
      const paymentId = query.paymentID;
      if (!paymentId) {
        throw new AppError(import_http_status20.default.BAD_REQUEST, "Payment Id Missing");
      }
      const status = query.status;
      if (!status) {
        throw new AppError(import_http_status20.default.BAD_REQUEST, "Payment Status is Missing");
      }
      const bkashIdToken = await getBkashIdToken();
      if (!bkashIdToken) {
        throw new AppError(import_http_status20.default.BAD_GATEWAY, "No Bkash Access Token Found!");
      }
      const executedPaymentResponse = await fetch(
        `${config_default.bkash_base_url}/tokenized/checkout/execute`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: bkashIdToken,
            "X-App-Key": config_default.bkash_app_key
          },
          body: JSON.stringify({
            paymentID: paymentId
          })
        }
      );
      const executedPaymentResult = await executedPaymentResponse.json();
      if (status === "success") {
        console.log("Payment ID:", paymentId);
        console.log("Execute Result:", executedPaymentResult);
        const payment = await tx.payment.findUnique({
          where: {
            bkashPaymentId: paymentId
          }
        });
        if (!payment) {
          throw new AppError(
            import_http_status20.default.NOT_FOUND,
            "Payment Not Found!"
          );
        }
        const rental = await tx.rental.findUnique({
          where: {
            id: payment.rentalId
          },
          include: {
            room: true,
            property: true,
            tenant: true
          }
        });
        if (!rental) {
          throw new AppError(
            import_http_status20.default.NOT_FOUND,
            "Rental Application Not Found!"
          );
        }
        const updatedPayment = await tx.payment.update({
          where: {
            id: payment.id
          },
          data: {
            status: PaymentStatus.PAID,
            bkashTrxId: executedPaymentResult.trxID,
            paidAt: executedPaymentResult.paymentExecuteTime,
            gatewayResponse: executedPaymentResult
          }
        });
        return {
          payment: updatedPayment,
          executedPaymentResult,
          redirectUrl: `${config_default.frontend_url}/payment/success?paymentId=${payment.id}`
        };
      } else if (status === "failure") {
        await tx.payment.update({
          where: {
            bkashPaymentId: paymentId
          },
          data: {
            status: PaymentStatus.FAILED,
            gatewayResponse: executedPaymentResult
          }
        });
        return {
          executedPaymentResult,
          redirectUrl: `${config_default.frontend_url}/payment/failed?paymentId=${paymentId}`
        };
      } else if (status === "cancel") {
        await tx.payment.update({
          where: {
            bkashPaymentId: paymentId
          },
          data: {
            status: PaymentStatus.CANCELLED,
            gatewayResponse: executedPaymentResult
          }
        });
        return {
          executedPaymentResult,
          redirectUrl: `${config_default.frontend_url}/payment/cancelled?paymentId=${paymentId}`
        };
      } else {
        return {
          executedPaymentResult,
          redirectUrl: `${config_default.frontend_url}/payment/failed?paymentId=${paymentId}`
        };
      }
    },
    {
      maxWait: 1e4,
      timeout: 3e4
    }
  );
  return transactionResult;
};
var getPaymentById = async (paymentId, userId) => {
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId
    },
    include: {
      application: true,
      property: true,
      room: true
    }
  });
  if (!payment) {
    throw new AppError(
      import_http_status20.default.NOT_FOUND,
      "Payment Not Found"
    );
  }
  if (payment.userId !== userId) {
    throw new AppError(
      import_http_status20.default.FORBIDDEN,
      "You are not allowed to view this payment"
    );
  }
  return payment;
};
var PaymentServices = {
  getBkashIdToken,
  createPayment,
  bkashCallback,
  getPaymentById
};

// src/app/module/payment/payment.controller.ts
var createPayment2 = catchAsync(async (req, res, next) => {
  const user = req.user;
  const result = await PaymentServices.createPayment(req.body, user);
  sendResponse(res, {
    statusCode: import_http_status21.default.OK,
    success: true,
    message: "Payment Created Successfully",
    data: result
  });
});
var bkashCallback2 = catchAsync(async (req, res, next) => {
  const result = await PaymentServices.bkashCallback(req.query);
  return res.redirect(
    result.redirectUrl
  );
});
var getPaymentById2 = catchAsync(async (req, res, next) => {
  const paymentId = req.params.id;
  const userId = req.user?.userId;
  const result = await PaymentServices.getPaymentById(paymentId, userId);
  sendResponse(res, {
    statusCode: import_http_status21.default.OK,
    success: true,
    message: "Payment Retrieved Successfully",
    data: result
  });
});
var PaymentController = {
  createPayment: createPayment2,
  bkashCallback: bkashCallback2,
  getPaymentById: getPaymentById2
};

// src/app/module/payment/payment.validation.ts
var import_zod7 = __toESM(require("zod"), 1);
var createPaymentValidationSchema = import_zod7.default.object({
  rentalId: import_zod7.default.string({ message: "Rental ID is required" }).min(1, "Rental ID is required")
});

// src/app/module/payment/payment.route.ts
var router8 = (0, import_express8.Router)();
router8.post(
  "/create",
  auth(Role.TENANT),
  validationRequest(createPaymentValidationSchema),
  PaymentController.createPayment
);
router8.get("/bkash/callback", PaymentController.bkashCallback);
router8.get("/:id", auth(Role.TENANT), PaymentController.getPaymentById);
var PaymentRoutes = router8;

// src/app/module/admin/admin.route.ts
var import_express9 = require("express");

// src/app/module/admin/Admin.services.ts
var getUsers = async (query) => {
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  const skip = (page - 1) * limit;
  const sortBy = query.sortBy ? query.sortBy : "createdAt";
  const sortOrder = query.sortOrder ? query.sortOrder : "desc";
  const andConditions = [
    {
      isDeleted: false
    }
  ];
  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        },
        {
          email: {
            contains: query.searchTerm,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (query.role) {
    andConditions.push({
      role: query.role
    });
  }
  if (query.status) {
    andConditions.push({
      status: query.status
    });
  }
  const allUsers = await prisma.user.findMany({
    where: {
      AND: andConditions
    },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder
    },
    omit: {
      password: true
    }
  });
  const totalUserCount = await prisma.user.count({
    where: {
      AND: andConditions
    }
  });
  return {
    data: allUsers,
    meta: {
      page,
      limit,
      total: totalUserCount,
      totalPages: Math.ceil(totalUserCount / limit)
    }
  };
};
var updateUserRole = async (id, role) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { role }
  });
  return updatedUser;
};
var updateUserStatus = async (id, status) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { status }
  });
  return updatedUser;
};
var deleteUser = async (id) => {
  await prisma.user.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: /* @__PURE__ */ new Date()
    }
  });
  return null;
};
var getDashboardStats = async () => {
  const [users, owners, tenants, properties, rooms, applications, payments] = await Promise.all([
    prisma.user.count({ where: { isDeleted: false } }),
    prisma.user.count({ where: { role: Role.OWNER, isDeleted: false } }),
    prisma.user.count({ where: { role: Role.TENANT, isDeleted: false } }),
    prisma.property.count({ where: { isDeleted: false } }),
    prisma.room.count({ where: { isDeleted: false } }),
    prisma.rental.count(),
    prisma.payment.count({ where: { status: PaymentStatus.PAID } })
  ]);
  return {
    users,
    owners,
    tenants,
    properties,
    rooms,
    applications,
    payments
  };
};
var AdminServices = {
  getUsers,
  updateUserRole,
  updateUserStatus,
  deleteUser,
  getDashboardStats
};

// src/app/module/admin/Admin.controller.ts
var getUsers2 = catchAsync(async (req, res) => {
  const result = await AdminServices.getUsers(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data: result
  });
});
var updateUserRole2 = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const result = await AdminServices.updateUserRole(userId, req.body.role);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User role updated successfully",
    data: result
  });
});
var updateUserStatus2 = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const result = await AdminServices.updateUserStatus(userId, req.body.status);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User status updated successfully",
    data: result
  });
});
var deleteUser2 = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const result = await AdminServices.deleteUser(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User deleted successfully",
    data: result
  });
});
var getDashboardStats2 = catchAsync(async (req, res) => {
  const result = await AdminServices.getDashboardStats();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Dashboard stats retrieved successfully",
    data: result
  });
});
var AdminController = {
  getUsers: getUsers2,
  updateUserRole: updateUserRole2,
  updateUserStatus: updateUserStatus2,
  deleteUser: deleteUser2,
  getDashboardStats: getDashboardStats2
};

// src/app/module/admin/admin.route.ts
var router9 = (0, import_express9.Router)();
router9.get("/users", auth(Role.ADMIN), AdminController.getUsers);
router9.patch("/users/:id/role", auth(Role.ADMIN), AdminController.updateUserRole);
router9.patch("/users/:id/status", auth(Role.ADMIN), AdminController.updateUserStatus);
router9.delete("/users/:id", auth(Role.ADMIN), AdminController.deleteUser);
router9.get("/dashboard-stats", auth(Role.ADMIN), AdminController.getDashboardStats);
var AdminRouters = router9;

// src/app.ts
var app = (0, import_express10.default)();
app.use((0, import_helmet.default)());
app.use(
  (0, import_cors.default)({
    // origin: config.frontend_url,
    credentials: true
  })
);
app.use(import_express10.default.urlencoded({ extended: true }));
app.use(import_express10.default.json());
app.use((0, import_cookie_parser.default)());
app.get("/", async (req, res) => {
  res.status(import_http_status22.default.OK).json({
    success: true,
    message: "Welcome to HomeSync System Backend"
  });
});
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/owner", OwnerRoutes);
app.use("/api/v1/properties", PropertyRouers);
app.use("/api/v1/rooms", RoomRoutes);
app.use("/api/v1/roommates", RoommateRouters);
app.use("/api/v1/rentals", RentalRouters);
app.use("/api/v1/payments", PaymentRoutes);
app.use("/api/v1/admin", AdminRouters);
app.get("/test", async (req, res, next) => {
  try {
    res.status(import_http_status22.default.OK).json({
      success: true,
      message: "Testing ",
      data: {}
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
app.use(globalErrorHandler);
app.use(notFound);
var app_default = app;

// src/app/utils/seed.ts
var import_bcryptjs2 = __toESM(require("bcryptjs"), 1);
var seedTesterAdmin = async () => {
  try {
    const isAdminExists = await prisma.user.findFirst({
      where: {
        role: Role.ADMIN
      }
    });
    if (isAdminExists) {
      console.log("Admin Already Exists!");
      return;
    }
    const name = config_default.tester_admin_name;
    const email = config_default.tester_admin_email;
    const password = config_default.tester_admin_password;
    if (!name || !email || !password) {
      throw new Error("Name, Email, Password is missing from .env!");
    }
    const hashedPassword = await import_bcryptjs2.default.hash(password, Number(config_default.bcrypt_salt_rounds));
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.ADMIN,
        isEmailVerified: true
      }
    });
    console.log("Tester Admin Created!");
  } catch (error) {
    console.log(error);
    await prisma.user.delete({
      where: {
        email: config_default.tester_admin_email
      }
    });
  }
};
var seedTesterOwner = async () => {
  try {
    const isOwnerExists = await prisma.user.findFirst({
      where: {
        role: Role.OWNER
      }
    });
    if (isOwnerExists) {
      console.log("Owner Already Exists!");
      return;
    }
    const name = config_default.tester_owner_name;
    const email = config_default.tester_owner_email;
    const password = config_default.tester_owner_password;
    if (!name || !email || !password) {
      throw new Error("Name, Email, Password is missing from .env!");
    }
    const hashedPassword = await import_bcryptjs2.default.hash(password, Number(config_default.bcrypt_salt_rounds));
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.OWNER,
        isEmailVerified: true,
        owner: {
          create: {
            phone: "1025555",
            address: "Dhaka"
          }
        }
      }
    });
    console.log("Tester Owner Created!");
  } catch (error) {
    console.log(error);
    await prisma.user.delete({
      where: {
        email: config_default.tester_owner_email
      }
    });
  }
};
var seedTesterTenant = async () => {
  try {
    const isTenantExists = await prisma.user.findFirst({
      where: {
        role: Role.TENANT
      }
    });
    if (isTenantExists) {
      console.log("Tenant Already Exists!");
      return;
    }
    const name = config_default.tester_tenant_name;
    const email = config_default.tester_tenant_email;
    const password = config_default.tester_tenant_password;
    if (!name || !email || !password) {
      throw new Error("Name, Email, Password is missing from .env!");
    }
    const hashedPassword = await import_bcryptjs2.default.hash(password, Number(config_default.bcrypt_salt_rounds));
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.TENANT,
        isEmailVerified: true,
        tenant: {
          create: {
            phone: "1025555",
            occupation: "Something",
            bio: "I am a Tenant",
            maxBudget: 1e4,
            minBudget: 500,
            preferredLocation: "Noakhali"
          }
        }
      }
    });
    console.log("Tester Tenant Created!");
  } catch (error) {
    console.log(error);
    await prisma.user.delete({
      where: {
        email: config_default.tester_tenant_email
      }
    });
  }
};

// src/server.ts
var PORT = config_default.port;
var main = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
    await redisClient.connect();
    console.log("Redis connected successfully.");
    await transporter.verify();
    console.log("Nodemailer connected successfully");
    await seedTesterAdmin();
    await seedTesterOwner();
    await seedTesterTenant();
    app_default.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
main();
//# sourceMappingURL=server.cjs.map
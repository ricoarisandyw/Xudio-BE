-- CreateTable
CREATE TABLE "user" (
    "username" TEXT,
    "password" TEXT,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "user_detail" (
    "idUser" INTEGER,
    "email" TEXT,
    "image" TEXT,
    "name" TEXT,
    "nop" TEXT,
    "role" TEXT,
    "created_at" TEXT,
    "updated_at" TEXT,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "begindate" TEXT,
    "duedate" TEXT,
    "createdat" DATETIME NOT NULL,
    "updatedat" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "companyid" INTEGER
);

-- CreateTable
CREATE TABLE "user_in_course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idcourse" INTEGER NOT NULL,
    "iduser" INTEGER NOT NULL,
    "score" INTEGER,
    "startcourse" DATETIME,
    "endcourse" DATETIME
);

-- CreateTable
CREATE TABLE "room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "createdAt" TEXT,
    "status" TEXT,
    "filled" INTEGER,
    "capacity" INTEGER
);

-- CreateTable
CREATE TABLE "user_in_room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" INTEGER,
    "idRoom" INTEGER
);

-- CreateTable
CREATE TABLE "video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "link" TEXT
);

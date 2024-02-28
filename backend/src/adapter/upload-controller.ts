import { Controller, Param } from "@nestjs/common";
import { Express } from "express";
import { UploadService } from "src/service/upload.service";
import { Post, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express"; 
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';


@Controller('/upload')
export class UploadController {
	constructor(private uploadService: UploadService) {}

@Post('/upload/:userId')
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: Express.Multer.File, @Param('userId') userId: number) {
  console.log(file);
  this.uploadService.saveFile(file, userId);
}
}

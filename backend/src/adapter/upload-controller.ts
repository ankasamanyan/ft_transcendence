import { Controller, Param, UseGuards } from "@nestjs/common";
import { Express } from "express";
import { UploadService } from "src/service/upload.service";
import { Post, UseInterceptors, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express"; 
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { JWTAuthGuard } from "src/auth/guards/auth.jwt.guard";

@Controller('/upload')
export class UploadController {
	constructor(private uploadService: UploadService) {}

  @UseGuards(JWTAuthGuard)
  @Post('/:userId')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Param('userId') userId: number) {
    console.log(file);
    this.uploadService.saveFile(file, userId);
    }
}

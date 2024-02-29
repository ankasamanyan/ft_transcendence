import {Injectable} from '@nestjs/common';
import {from} from "rxjs";
import { PrismaUploadRepository } from 'src/adapter/repository/prisma-upload-repository';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';



@Injectable()
export class UploadService {

	constructor(public uploadRepository: PrismaUploadRepository) {}

	async saveFile(file: Express.Multer.File, userId: number) {
		const uploadDirectory = path.resolve('/backend/pictures');
		const uniqueFilename = uuidv4() + path.extname(file.originalname);
		const filePath = path.join(uploadDirectory, uniqueFilename);
	
		// Save the file to the local machine
		await fs.promises.writeFile(filePath, file.buffer);
		//store the file path in database
		return from(this.uploadRepository.saveImagetoUser(filePath, userId));
	  }
}
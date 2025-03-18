import { Request, Response } from 'express';
import { ResponseHandler } from '../utils/responseHandler';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export class DocsController {
  static async getDocumentation(req: Request, res: Response): Promise<void> {
    try {
      const readmePath = path.join(__dirname, '../../README.md');
      const readme = fs.readFileSync(readmePath, 'utf8');
      const htmlContent = DocsController.getHtmlTemplate(readme);
      
      res.type('html').send(htmlContent);
    } catch (error) {
      ResponseHandler.error(res, 500, 'Error al obtener la documentación');
    }
  }

  private static getHtmlTemplate(content: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>API Documentation</title>
          <style>
            body {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            pre {
              background-color: #f4f4f4;
              padding: 15px;
              border-radius: 5px;
              overflow-x: auto;
            }
            code {
              background-color: #f4f4f4;
              padding: 2px 5px;
              border-radius: 3px;
            }
            h1, h2 {
              border-bottom: 1px solid #ddd;
            }
          </style>
        </head>
        <body>
          ${marked(content)}
        </body>
      </html>
    `;
  }
}

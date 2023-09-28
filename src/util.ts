import path from 'path';
import fs from 'fs';

export const getFilePath = (recUrl: string|undefined): string => {
    const fileName = recUrl === '/' ? 'index.html' : recUrl ?? '',
        filePath = path.join(getPublic(), fileName);
    return fs.existsSync(filePath)
        ? filePath
        : path.join(getPublic(), '404.html');
};

const getPublic = (): string => path.join(__dirname, '..', 'public');

export const getHeader = (contentType: string|null = null) => {
    const outType = contentType ?? 'text/plain';
    return {'Content-Type': outType + '; charset=utf-8'};
};

export const getBaseName = (fileName:string): string => path.basename(fileName);

export const isStatic = (recUrl: string|undefined): boolean => {
    return Boolean(recUrl?.startsWith('/download/'))
        && getBaseName(getFilePath(recUrl)) !== '404.html';
};
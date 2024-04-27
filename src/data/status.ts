 const Icons: Record<number, string> = {
     0: 'https://www.pngitem.com/pimgs/m/22-226960_download-success-png-image-green-like-button-png.png',
    1: 'https://as1.ftcdn.net/v2/jpg/00/95/83/46/1000_F_95834632_CL4kevuB3WZLoX72MB52KTLJqx4qhvQj.jpg',
    2: ''
}

export const STATUS = {
    error: 0,
    success: 1,
    failed: 2
}


export const getIcon = (fileSize: number): string => {
    if (fileSize === 0) {
        return Icons[0];
    } else if (fileSize === 1) {
        return Icons[1];
    } else {
        return Icons[3];
    }
}

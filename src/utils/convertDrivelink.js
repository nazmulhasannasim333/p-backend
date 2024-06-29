export const getGoogleDriveViewerLink = (driveLink) => {
    if (!driveLink) return '';
    const fileId = driveLink.match(/[-\w]{25,}/);
    return fileId ? `https://drive.google.com/file/d/${fileId[0]}/preview` : driveLink;
};
const imageHandle = (link) => {
    return `${process.env.NEXT_PUBLIC_API_IMAGE_URL}${link}`;
}

export default imageHandle;
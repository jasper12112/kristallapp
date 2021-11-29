import { useState } from 'react';
import ImagePicker, {MediaType} from 'react-native-image-picker';

export default class ImageUtil {

    public static setImage(newImage: string)
    {
        return;
    }

    public static selectPhotoTapped = (type: MediaType) => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType: type,
        };

        ImagePicker.launchImageLibrary(options, (response) => {

            if(!response)
            {return;}

            if (response.didCancel) 
            {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const uri = response.assets![0].uri;
                const type = response.assets![0].type;
                const name = response.assets![0].fileName;
                const source = {
                    uri,
                    type,
                    name,
                }
            }
        });
    }

    private static cloudinaryUpload = (photo: any) => {
        const data = new FormData()
        data.append('file', photo)
        data.append('upload_preset', 'ogcodes')
        data.append("cloud_name", "ogcodes")
        fetch("https://api.cloudinary.com/v1_1/ogcodes/upload", {
          method: "post",
          body: data
        }).then(res => res.json()).
          then(data => {
            ImageUtil.setImage(data.secure_url)
          }).catch(err => {
            console.log(err);
        })
    }
}

// https://refactoring.guru/design-patterns/singleton/typescript/example
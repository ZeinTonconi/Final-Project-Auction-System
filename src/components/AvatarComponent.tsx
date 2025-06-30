import {ChangeEvent, useState} from "react";
import {Avatar, Badge, Container, IconButton, Stack, Tooltip, Typography} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";

interface AvatarUploadProps {
    avatarSrc: string | undefined;
    onAvatarChange: (dataUrl: string) => void;
    placeholderInitial?: string;
}

export const AvatarUpload = ({
                                 avatarSrc,
                                 onAvatarChange,
                                 placeholderInitial = undefined,
                             }: AvatarUploadProps) => {
    const [localAvatar, setLocalAvatar] = useState<string | undefined>(avatarSrc);

    const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = reader.result as string;
                setLocalAvatar(dataUrl);
                onAvatarChange(dataUrl); // Notify parent (Login Page) to update Formik state
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Stack alignItems="center" sx={{ mb : 2 }}>
                <IconButton
                    component="label"
                    sx={{
                        position: "relative",
                        width: 100,
                        height: 100,
                        mb: 1,
                    }}
                >
                    <Badge
                        overlap="circular"
                        anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                        badgeContent={
                            <PhotoCamera
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "50%",
                                    padding: "4px",
                                    fontSize: 24,
                                    color: "primary.main",
                                }}
                            />
                        }
                    >
                        <Avatar
                            src={localAvatar}
                            alt="Upload avatar"
                            sx={{
                                width: 100,
                                height: 100,
                                border: "2px solid",
                                borderColor: "primary.main",
                                boxShadow: 3,
                                fontSize: 32,
                            }}
                        >
                            {placeholderInitial}
                        </Avatar>
                    </Badge>
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleAvatarChange}
                    />
                </IconButton>
                <Typography variant="caption" color="text.secondary">
                    Click the avatar to upload your photo
                </Typography>

            </Stack>

        </>
    );
};


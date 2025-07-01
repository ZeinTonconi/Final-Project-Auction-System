import { SpeedDial, SpeedDialAction, SpeedDialIcon, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GavelIcon from "@mui/icons-material/Gavel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box } from "@mui/material";
import { useUser } from "../contexts/userContext";

interface AuctionCardActionsProps {
    isActive: boolean;
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const AuctionCardActions = ({
    isActive,
    onView,
    onEdit,
    onDelete,
}: AuctionCardActionsProps) => {
    const { user } = useUser();

    if (!user) return null;

    const actions = [
        { name: "View", icon: <VisibilityIcon />, action: onView },
        { name: "Edit", icon: <EditIcon />, action: onEdit },
        { name: "Delete", icon: <DeleteIcon />, action: onDelete },
    ];

    return (
        <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
            {user.role === "admin" ? (
                <SpeedDial
                    ariaLabel="Actions"
                    direction="down"
                    icon={<SpeedDialIcon icon={<SettingsIcon />} />}
                    FabProps={{
                        size: "small",
                        sx: { width: 32, height: 32, minHeight: 32, boxShadow: "none" },
                    }}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={action.action}
                            FabProps={{ size: "small", sx: { width: 28, height: 28, minHeight: 28 } }}
                        />
                    ))}
                </SpeedDial>
            ) : (
                <IconButton
                    color="primary"
                    onClick={onView}
                    size="small"
                    sx={{ backgroundColor: "white", mr: 1 }}
                >
                    <VisibilityIcon/>
                </IconButton>
            )}
        </Box>
    );
};

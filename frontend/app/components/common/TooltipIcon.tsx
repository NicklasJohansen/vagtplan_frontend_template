import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface LabelWithTooltipProps {
  label: string;
  tooltip: string;
  placement?: "top" | "bottom" | "left" | "right";
  className?: string;
  iconSize?: number;
}

export const TooltipIcon = ({
  label,
  tooltip,
  placement = "bottom",
  className = "",
  iconSize = 16,
}: LabelWithTooltipProps) => {
  return (
    <span className={`flex items-center gap-1 ${className}`}>
      {label}
      <Tooltip title={tooltip} placement={placement}>
        <InfoOutlinedIcon
          sx={{ fontSize: iconSize, color: "gray", cursor: "pointer" }}
        />
      </Tooltip>
    </span>
  );
};

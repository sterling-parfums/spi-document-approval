import { FindInPage } from '@mui/icons-material';
import { IconButton } from '@mui/material';

type PreviewButtonProps = {
  button?: React.ReactNode;
  onClick: () => void;
};

export default function PreviewButton({ button, onClick }: PreviewButtonProps) {
  if (button) {
    return (
      <span
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {button}
      </span>
    );
  }

  return (
    <IconButton
      aria-label="preview"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <FindInPage />
    </IconButton>
  );
}

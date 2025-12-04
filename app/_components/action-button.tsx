import { Check, Clear, FindInPage } from '@mui/icons-material';
import { IconButton } from '@mui/material';

type ButtonType = 'Approve' | 'Reject' | 'Preview';

type ActionButtonProps = {
  button?: React.ReactNode;
  onClick: () => void;
  buttonType: ButtonType;
};

export default function ActionButton({
  button,
  onClick,
  buttonType,
}: ActionButtonProps) {
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

  const icon =
    buttonType === 'Approve' ? (
      <Check />
    ) : buttonType === 'Reject' ? (
      <Clear />
    ) : (
      <FindInPage />
    );

  return (
    <IconButton
      color={
        buttonType === 'Approve'
          ? 'success'
          : buttonType === 'Reject'
            ? 'error'
            : 'default'
      }
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {icon}
    </IconButton>
  );
}

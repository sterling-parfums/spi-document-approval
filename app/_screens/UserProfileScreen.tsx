'use client';

import ControlledStyledTextField from '@/app/_components/controlled/controlled-styled-text-field';
import { useResponsive } from '@/hooks/use-responsive';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getMe, updateMe } from '../api/_client/user.client';

type ProfileForm = {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function UserProfileScreen() {
  const { control, handleSubmit, watch, trigger, reset } = useForm<ProfileForm>(
    {
      defaultValues: {
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    }
  );

  const { isMobile } = useResponsive();
  const newPasswordValue = watch('newPassword');
  const confirmPasswordValue = watch('confirmPassword');

  useEffect(() => {
    async function loadMyDetails() {
      const me = await getMe();
      if (!me.success) {
        enqueueSnackbar('Unable to fetch User', { variant: 'error' });
        return;
      }

      reset({
        name: me.data.name,
        email: me.data.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }

    loadMyDetails();
  }, [reset]);

  useEffect(() => {
    if (confirmPasswordValue) {
      trigger('confirmPassword');
    }
  }, [newPasswordValue, confirmPasswordValue, trigger]);

  const onSubmit = async (data: ProfileForm) => {
    const res = await updateMe({
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    if (!res.success) {
      enqueueSnackbar(res.error, {
        variant: 'error',
      });
    } else {
      enqueueSnackbar('Profile updated successfully', {
        variant: 'success',
      });
    }

    reset({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <Box maxWidth={430} mx="auto" sx={{ p: 2 }}>
      {!isMobile && (
        <Typography variant="h4" mb={3}>
          Profile
        </Typography>
      )}

      {/* Profile Info */}
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>
          Account Details
        </Typography>

        <Stack spacing={2}>
          <ControlledStyledTextField
            name="name"
            label="Username"
            control={control}
            disabled
          />

          <ControlledStyledTextField
            name="email"
            label="Email"
            control={control}
            disabled
          />
        </Stack>
      </Card>

      {/* Change Password */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>
          Change Password
        </Typography>

        <Stack spacing={2}>
          <ControlledStyledTextField
            name="currentPassword"
            label="Current Password"
            type="password"
            control={control}
            rules={{ required: 'Current password is required' }}
          />

          <ControlledStyledTextField
            name="newPassword"
            label="New Password"
            type="password"
            control={control}
            rules={{ required: 'New password is required' }}
          />

          <ControlledStyledTextField
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            control={control}
            rules={{
              required: 'Please confirm your new password',
              validate: (value) =>
                value === newPasswordValue || 'Passwords do not match',
            }}
          />

          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            sx={{ alignSelf: 'flex-end' }}
          >
            Update Password
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

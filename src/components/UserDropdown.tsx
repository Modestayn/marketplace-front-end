import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth.ts';
import { Link } from '@tanstack/react-router';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function UserDropdown() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='flex items-center gap-1 px-2'>
          <div className='flex flex-col items-start text-sm'>
            <span className='font-medium'>{user.name}</span>
            <span className='text-xs text-muted-foreground'>{user.email}</span>
          </div>
          <ChevronDown className='h-4 w-4 text-muted-foreground' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end'>
        <DropdownMenuLabel>{t('navbar.account.account')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to='/profile' className='flex items-center cursor-pointer'>
              <User className='mr-2 h-4 w-4' />
              <span>{t('navbar.account.profile')}</span>
            </Link>
          </DropdownMenuItem>
          {/*<DropdownMenuItem asChild>*/}
          {/*  <Link to='/settings' className='flex items-center cursor-pointer'>*/}
          {/*    <Settings className='mr-2 h-4 w-4' />*/}
          {/*    <span>{t('navbar.account.settings')}</span>*/}
          {/*  </Link>*/}
          {/*</DropdownMenuItem>*/}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logout()}
          className='text-destructive focus:text-destructive cursor-pointer'
        >
          <LogOut className='mr-2 h-4 w-4' />
          <span>{t('navbar.account.logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

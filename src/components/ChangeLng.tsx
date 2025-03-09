import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className='flex items-center gap-2'>
      <Select defaultValue={i18n.language} onValueChange={changeLanguage}>
        <SelectTrigger className='w-[120px]'>
          <SelectValue placeholder='Language' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='en'>English</SelectItem>
          <SelectItem value='uk'>Українська</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

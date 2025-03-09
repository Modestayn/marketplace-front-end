import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <section className='flex justify-center items-center'>
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className='appearance-none bg-transparent border border-gray-400 text-gray-700 px-2 py-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400'
      >
        <option className='bg-white text-black' value='ua'>
          🇺🇦 UA
        </option>
        <option className='bg-white text-black' value='en'>
          🇬🇧 EN
        </option>
      </select>
    </section>
  );
};

export default LanguageSwitcher;

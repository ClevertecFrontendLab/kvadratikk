import star from '../../../assets/icons/star.svg';
import starYellow from '../../../assets/icons/star-yellow.svg';
import userAvatar from '../../../assets/images/user.png';
import { User } from '../../../interfaces/book-item';

export const Review = ({
  rating,
  text,
  createdAt,
  user,
}: {
  rating: number;
  text: string;
  createdAt: string;
  user: User;
}) => {
  const { firstName, lastName, avatarUrl } = user;
  const date = new Date(createdAt).toLocaleString('ru', { day: 'numeric', year: 'numeric', month: 'long' });

  return (
    <li>
      <div className='user'>
        <img src={avatarUrl ? `https://strapi.cleverland.by${avatarUrl}` : userAvatar} alt='user' />
        <span>{`${firstName} ${lastName}`}</span>
        <span>{date}</span>
      </div>
      <div className='stars'>
        {Array.from({ length: 5 }, (_, i) => i).map((point) => (
          <img src={point < rating ? starYellow : star} alt='star' key={point} />
        ))}
      </div>
      <p>{text}</p>
    </li>
  );
};

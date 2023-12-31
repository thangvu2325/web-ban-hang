import { FunctionComponent, ReactNode, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '@/components/Items/Items.module.scss';
import Image from 'next/image';
import Button from '@/components/Button';
import { useDispatch } from 'react-redux';
import cartSlice from '@/redux/slices/cartSlice';
import ModalCart from '../ModalCart';
import Link from 'next/link';
import { Item } from '@/types/frontEnd';
const cx = classNames.bind(styles);

interface ItemsProps {
  title?: string;
  items: Item[] | undefined;
  horizon_line?: boolean;
}

const Items: FunctionComponent<ItemsProps> = ({ horizon_line, title, items }): ReactNode => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleClickButton = (item: Item) => {
    dispatch(cartSlice.actions.addItem(item));
    setOpenModal(true);
  };
  return (
    <div
      className={cx('wrap', {
        horizon_line,
      })}
    >
      <div className={cx('container')}>
        <div className={cx('top')}>
          <h2 className={cx('top-title')}>{title}</h2>
        </div>
        <div className={cx('items')}>
          {items &&
            items.slice(0, 24).map((item, index) => (
              <div key={index} className={cx('item')}>
                <Link className={cx('item-img')} href={'item/' + item._id}>
                  <Image src={item.img_small} alt="item" width={200} height={200} style={{ objectFit: 'cover' }} />
                </Link>
                <div className={cx('item-title')}>{item.name}</div>
                <div className={cx('item-price')}>{item.price_final.toLocaleString()}₫</div>
                <Button outline className={cx('item-btn')} onClick={() => handleClickButton(item)}>
                  Mua Ngay
                </Button>
              </div>
            ))}
        </div>
        <div className={cx('action')}>
          <Button href="/all" primary semiRounded className={cx('action-btn')}>
            Xem tất cả
          </Button>
        </div>
      </div>
      {openModal ? <ModalCart open={openModal} action={setOpenModal} /> : ''}
    </div>
  );
};

export default Items;

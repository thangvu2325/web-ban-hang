'use client';
import classNames from 'classnames/bind';
import styles from '@/layouts/components/Header/Header.module.scss';
import {
  IconBrandFacebookFilled,
  IconBrandGoogle,
  IconBrandTwitterFilled,
  IconBrandYoutube,
  IconShoppingCart,
  IconUserCircle,
} from '@tabler/icons-react';
import Link from 'next/link';

import Tippy from '@tippyjs/react/headless'; // different import path!
import 'tippy.js/dist/tippy.css';
import Image from 'next/image';
import Button from '@/components/Button';
import { FunctionComponent, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import filtersSlice from '@/redux/filtersSlice';
import { useSelector } from 'react-redux';
import { itemsRemainingSelector } from '@/redux/selectors';
import { cartSelector } from '@/redux/selectors';
import cartSlice from '@/redux/cartSlice';
const cx = classNames.bind(styles);
interface HeaderProps {}
interface item {
  name: string;
  id: string;
  img: string;
  price: string;
  about?: string[];
  available: boolean;
  count: number;
}
type Cart = {
  newItem?: item;
  listItem?: item[];
};
const Header: FunctionComponent<HeaderProps> = (): ReactNode => {
  const [searchValue, setSearchValue] = useState<string>('');

  const itemList = useSelector(itemsRemainingSelector);
  const dispatch = useDispatch();
  const handleChangeCount = (id: string, value: number) => {
    dispatch(cartSlice.actions.editCountItem({ id, value }));
  };
  const cart: Cart = useSelector(cartSelector) || {};
  const handleChangeSearchInput = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchValue(e.target.value);
    dispatch(filtersSlice.actions.searchFilterChange(e.target.value));
  };

  return (
    <div className={cx('wrap')}>
      <div className={cx('container')}>
        <div className={cx('top')}>
          <div className={cx('top-content')}>
            <div className={cx('title')}>
              Thế giới linh kiện điện tử, ic các loại, atmega, stm, ic 8051, ic 78xx, ic 74xx, ic nguồn, arduino, module
              ...
            </div>
            <div className={cx('list-icon')}>
              <div className={cx('icon')} data-index="facebook">
                <IconBrandFacebookFilled stroke={1} size={12} />
              </div>
              <div className={cx('icon')} data-index="twitter">
                <IconBrandTwitterFilled stroke={1} size={12} />
              </div>
              <div className={cx('icon')} data-index="google">
                <IconBrandGoogle stroke={3} size={12} />
              </div>
              <div className={cx('icon')} data-index="youtube">
                <IconBrandYoutube stroke={1} size={12} />
              </div>
            </div>
          </div>
        </div>
        <div className={cx('main')}>
          <div className={cx('main-content')}>
            <div className={cx('logo')}>
              <Image src="/assets/images/logo.png" width={263} height={58} alt="Picture in here is Logo" />
            </div>
            <div className={cx('search')}>
              <div className={cx('search-container')}>
                <div className={cx('search-vector')}>Arduino, module, nguồn, cảm biến, ic...</div>
                <form className={cx('search-form')}>
                  <Tippy
                    visible={!!searchValue}
                    interactive
                    placement="bottom-end"
                    offset={[0, 0]}
                    render={(attrs) => {
                      return (
                        <div className={cx('search-menu')} tabIndex={-1} {...attrs}>
                          {itemList.length
                            ? itemList.map((item) => (
                                <div className={cx('search-item')} key={item.id}>
                                  <Image src={item.img} alt="image item" width={32} height={32}></Image>
                                  <div className={cx('search-item-title')}>{item.name}</div>
                                  <div className={cx('search-item-price')}>{item.price}</div>
                                </div>
                              ))
                            : ''}
                        </div>
                      );
                    }}
                  >
                    <input
                      placeholder="Nhập từ khóa cần tìm"
                      type="text"
                      className={cx('search-input')}
                      onChange={handleChangeSearchInput}
                      spellCheck={false}
                    />
                  </Tippy>

                  <Button primary className={cx('search-btn')}>
                    Tìm Kiếm
                  </Button>
                </form>
              </div>
            </div>
            <div className={cx('accout-cart')}>
              <div className={cx('accout-cart-container')}>
                <div className={cx('user')}>
                  <div className={cx('user-logo')}>
                    <IconUserCircle size={31} stroke={1} />
                  </div>
                  <div className={cx('user-action')}>
                    <Link href="/taikhoan">Tài Khoản</Link> / <Link href="/logout">Đăng Xuất</Link>
                  </div>
                </div>

                <Tippy
                  hideOnClick={true}
                  interactive
                  placement="bottom-end"
                  offset={[0, 0]}
                  render={(attrs) => {
                    return (
                      <div className={cx('menu-list')} tabIndex={-1} {...attrs}>
                        {cart.listItem?.length ? (
                          cart.listItem?.map((item) => {
                            return (
                              <div className={cx('item')} key={item.id}>
                                <Image src={item.img} alt="logo-item" width={85} height={85} />
                                <div className={cx('item-content')}>
                                  <div className={cx('item-title')}>{item.name}</div>
                                  <div className={cx('item-price')}>{item.price}₫</div>
                                  <div className={cx('item-count')}>
                                    <div className={cx('item-input')}>
                                      <input
                                        className={cx('item-count-input', 'custom-input')}
                                        type="number"
                                        value={item.count}
                                        min={0}
                                        max={200}
                                        onChange={(e) => handleChangeCount(item.id, Number(e.target.value))}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className={cx('no-item')} tabIndex={-1}>
                            <p>Không có sản phẩm nào trong giỏ hàng.</p>
                          </div>
                        )}
                        <div className={cx('total')}>
                          <div className={cx('total-value')}>
                            <span className={cx('thanhtien')}>Thành tiền:</span>
                            <span className={cx('price')}>
                              {cart.listItem
                                ?.reduce((acc, item) => {
                                  const count = item.count;
                                  const price = parseFloat(item.price.replace('.', ''));
                                  const subtotal = count * price;
                                  return acc + subtotal;
                                }, 0)
                                .toLocaleString()}
                              ₫
                            </span>
                          </div>
                        </div>
                        <div className={cx('item-action')}>
                          <Button className={cx('action-btn')} primary>
                            Giỏ hàng
                          </Button>
                          <Button className={cx('action-btn')} outline>
                            Đặt hàng
                          </Button>
                        </div>
                      </div>
                    );
                  }}
                >
                  <div className={cx('cart')}>
                    <div className={cx('cart-logo')}>
                      <IconShoppingCart size={31} stroke={1} />
                    </div>
                    <div className={cx('cart-action')}>Giỏ hàng</div>
                    <div className={cx('cart-count')}>{cart.listItem?.length}</div>
                  </div>
                </Tippy>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;

// setInterval(()=>{debugger},1000)

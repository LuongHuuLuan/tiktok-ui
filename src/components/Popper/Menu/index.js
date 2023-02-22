import className from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWraper } from '~/components/Popper';
import styles from './Menu.module.scss';
import Header from './Header';
import MenuItem from './MenuItem';
import { useState } from 'react';

const cx = className.bind(styles);
const fnDefault = () => {};
function Menu({ children, items = [], onChange = fnDefault }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((pre) => [...pre, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    return (
        <Tippy
            delay={[0, 700]}
            offset={[12, 8]}
            placement="bottom-end"
            interactive
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWraper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <Header
                                title="Languages"
                                onBack={() => setHistory((pre) => pre.slice(0, pre.length - 1))}
                            />
                        )}
                        {renderItems()}
                    </PopperWraper>
                </div>
            )}
            onHide={() => {
                setHistory((pre) => pre.slice(0, 1));
            }}
        >
            {children}
        </Tippy>
    );
}

export default Menu;

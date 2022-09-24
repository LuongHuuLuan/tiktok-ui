import className from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWraper } from '~/components/Popper';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const cx = className.bind(styles);
function Menu({ children, items = [] }) {
    const renderItems = () => {
        return items.map((item, index) => <MenuItem key={index} data={item} />);
    };
    return (
        <Tippy
            delay={[0, 700]}
            placement="bottom-end"
            interactive
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWraper className={cx('menu-popper')}>{renderItems()}</PopperWraper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
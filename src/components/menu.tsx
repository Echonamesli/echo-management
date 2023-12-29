import { useLocation, useNavigate } from "react-router-dom";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Menu, type MenuProps } from 'antd';
import { useEffect, useState } from "react";

type MenuItem = Required<MenuProps>['items'][number];


const items: MenuItem[] = [
    {
        label: '栏目1',
        key: '/page1',
        icon: <PieChartOutlined />
    },
    {
        label: '栏目2',
        key: '/page2',
        icon: <DesktopOutlined />
    },
    {
        label: '栏目3',
        key: '/page3',
        icon: <UserOutlined />,
        children:[
            {
                label: '栏目301',
                key: '/page3/page301'
            },
            {
                label: '栏目302',
                key: '/page3/page302'
            },
            {
                label: '栏目303',
                key: '/page3/page303'
            },
        ]
    },
    {
        label: '栏目4',
        key: '/page4',
        icon: <TeamOutlined />,
        children:[
            {
                label: '栏目401',
                key: '/page4/page401'
            },
            {
                label: '栏目402',
                key: '/page4/page402'
            }
        ]
    },
    {
        label: '栏目5',
        key: '/page5',
        icon: <FileOutlined />
    }
];

const Comp: React.FC = () => {
    const navigateTo = useNavigate()
    const currentRoute = useLocation()
    
    //点击左侧菜单栏可以跳转到对应路由:编程式导航——利用useNavigate
    const menuClick = (e: { key: string }) => {
        //console.log(e);
        navigateTo(e.key)
    }

    //因为已经设置了导航栏的点亮项是路径地址项
    //所以还要根据浏览器地址栏的路径设置展开项的初始值
    //比如路径是page3/page301，则刷新后page3的导航栏要展开
    //拿着currentRoute的pathname与items数组每一项的children的key对比，如果有相等的，就把children
    //的父亲的key设置为openKeys的初始值
    let firstOpenKey:string = "";
    let splitKeys:Array<string> = currentRoute.pathname.split("/")
    if(splitKeys.length > 1){
        firstOpenKey = "/" + splitKeys[1];
    }
    useEffect(() => {
        setOpenKeys([firstOpenKey])
    }, [])

    //当前展开项
    const [openKeys, setOpenKeys] = useState([''])

    //展开和回收菜单会触发
    const handleOpenChange = (keys: string[]) => {
        //console.log(keys);  // keys是记录当前展开项的数组
        //设置最新点击的那一项为展开，其它均关闭
        //console.log(openKeys);
        setOpenKeys([keys[keys.length - 1]])
    }
    return (
        <Menu
            theme="dark"
            defaultSelectedKeys={[currentRoute.pathname]}
            mode="inline" items={items}
            onClick={menuClick}
            onOpenChange={handleOpenChange}
            openKeys={openKeys}
        />
    )
}

export default Comp
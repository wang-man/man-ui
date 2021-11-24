import React, { useState } from 'react';

import Button from './components/Button';
import Transition from './components/Transition';
import Icon from './components/Icon'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import Menu from './components/Menu';

library.add(fas);

const App: React.FC = () => {
  const menuSelect = (index: string) => {
    console.log('选择了菜单项: ', index)
  }
  const [show, setShow] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <Icon icon='coffee' />
        <Button autoFocus={true}>Hello</Button>
        <Button btnType={'primary'} size={'lg'} onClick={(e: any) => { e.preventDefault(); alert(123) }}>Hello</Button>
        <Button btnType={'danger'} size={'sm'}>Hello</Button>
        <Button disabled={true} btnType={'danger'} size={'sm'}>Hello</Button>
        <Button btnType={'link'} href='http://baidu.com'>Hello</Button>
        <Button btnType={'link'} href='http://baidu.com' disabled={true}>Hello</Button>
        <hr />

        <Menu onSelect={menuSelect} mode='vertical'>
          <Menu.Item>hiuhiiu</Menu.Item>
          <Menu.Item>hiuhiiu</Menu.Item>
          <Menu.SubMenu title='子menu'>
            <Menu.Item>huukhihkjhkl</Menu.Item>
            <Menu.Item>btgbjhnj</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item>hiuhiiu</Menu.Item>
        </Menu>

        <Menu onSelect={menuSelect} mode='horizontal'>
          <Menu.Item>hiuhiiu</Menu.Item>
          <Menu.Item>hiuhiiu</Menu.Item>
          <Menu.SubMenu title='子menu'>
            <Menu.Item>huukhihkjhkl</Menu.Item>
            <Menu.Item>btgbjhnj</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item>hiuhiiu</Menu.Item>
        </Menu>

        <Button onClick={() => setShow(!show)} btnType='primary'>Toggle</Button>
        <Transition
          in={show}
          timeout={300}
          classNames='zoom-in-top'
        >
          <div>
            <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
            <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
            <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
            <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
          </div>
        </Transition>
      </header>
    </div>
  );

}

export default App;

import Component from '@glimmer/component';

interface Menu {
  route: string,
  label: string,
}

export default class ExampleComponent extends Component {
  routes: Menu[] = [
    {
      route: 'index',
      label: 'Home',
    },
  ];
}
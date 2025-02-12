import { Component, computed, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { sidenavAnimations } from './side-nav-bar.animations';
import { MatTooltipModule } from '@angular/material/tooltip';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
  subItems?: MenuItem[];
  expanded?: boolean;
};
@Component({
  selector: 'app-side-nav-bar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatIcon,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    RouterModule,
    CommonModule,
    MatTooltipModule,
  ],
  templateUrl: './side-nav-bar.component.html',
  styleUrl: './side-nav-bar.component.scss',
  animations: sidenavAnimations,
})
export class SideNavBarComponent {
  logout() {
    // Lógica de deslogueo
    console.log('Logout clicked');
  }
  collapsed = signal(false);

  menuItems = signal<MenuItem[]>([
    {
      icon: 'account_balance',
      label: 'Archivos',
      expanded: false,
      subItems: [
        {
          icon: 'explore',
          label: 'Paises',
          route: 'paises',
        },
        {
          icon: 'location_on',
          label: 'Provincias',
          route: 'provincias',
        },
      ],
    },
    {
      icon: 'people',
      label: 'Clientes',
      route: 'clientes',
    },
    {
      icon: 'badget',
      label: 'Choferes',
      route: 'choferes',
    },
    {
      icon: 'commute',
      label: 'Viajes',
      route: 'viajes',
    },

    {
      icon: 'settings',
      label: 'Configuración',
      route: 'configuracion',
    },
    {
      icon: 'insert_chart',
      label: 'Informes',
      expanded: false,
      subItems: [
        {
          icon: 'bar_chart',
          label: 'Viajes',
          route: 'infViajes',
        },
        {
          icon: 'pie_chart',
          label: 'Choferes',
          route: 'infChoferes',
        },
        {
          icon: 'article',
          label: 'Ventas',
          route: 'infVentas',
        },
      ],
    },
    {
      icon: 'logout',
      label: 'Salir',
      route: 'login',
    },
  ]);
  toggleMenu(item: MenuItem) {
    item.expanded = !item.expanded;
  }

  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));

  logoPicSize = computed(() => (this.collapsed() ? '32' : '160'));
  // Alternar colapso de todo el menú
  collapseAll() {
    this.collapsed.set(!this.collapsed());
    if (this.collapsed()) {
      this.menuItems().forEach((item) => {
        item.expanded = false; // Colapsa todos los subitems al cerrar el menú
      });
    }
  }
  // collapseAll() {
  //   this.menuItems().forEach((item) => {
  //     if (item.subItems) {
  //       item.expanded = false;
  //     }
  //   });
  //   this.collapsed.set(!this.collapsed());
  // }
}

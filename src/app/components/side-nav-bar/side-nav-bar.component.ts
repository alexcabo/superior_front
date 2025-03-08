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
import { AuthService } from '../../services/auth.service';

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
 constructor(private authService: AuthService) { }

  logout() {
    // Lógica de deslogueo
    console.log('Logout clicked');
    this.authService.logout();
  }
  
  collapsed = signal(false);

  menuItems = signal<MenuItem[]>([
    {
      icon: 'people',
      label: 'Alumnos',
      route: 'alumnos',
    },
    {
      icon: 'settings_accessibility',
      label: 'Docentes',
      route: 'docentes',
    },
    {
      icon: 'edit_calendar',
      label: 'Exámenes',
      route: 'examenes',
      subItems: [
        {
        icon: 'format_line_spacing',
        label: 'Turnos',
        route: 'turnos',
        },
        {
          icon: 'format_list_numbered',
          label: 'Mesas',
          route: 'mesas',
        },
        {
          icon: 'edit_note',
          label: 'Inscripción Alunno',
          route: 'inscripcion',
        },
        ]
    },
    {
      icon: 'insert_chart',
      label: 'Informes',
      expanded: false,
      subItems: [
        {
          icon: 'bar_chart',
          label: 'Estado',
          route: 'estado',
        },
        {
          icon: 'pie_chart',
          label: 'Otro',
          route: 'info',
        },
      ],
    },    
    {
      icon: 'settings',
      label: 'Configuración',
      route: 'configuracion',
      expanded: false,
      subItems: [
        {
        icon: 'library_books',
        label: 'Carreras',
        route: 'carreras',
        },
        {
          icon: 'subject',
          label: 'Materias',
          route: 'materias',
          },
        {
          icon: 'location_on',
          label: 'Residencias',
          route: 'residencias',
        },
      ],      
    },
    {
      icon: 'logout',
      label: 'Salir',
      route: 'logout',
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

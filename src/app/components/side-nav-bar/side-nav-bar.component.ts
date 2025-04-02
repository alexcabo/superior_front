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
  styleUrls: ['./side-nav-bar.component.scss'],
  animations: sidenavAnimations,
})
export class SideNavBarComponent {
  isSidenavOpen: boolean = true; // El sidenav comienza abierto

  constructor(private authService: AuthService) {}

  // Método para alternar la visibilidad del sidenav
  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  
  // Devuelve el margen del contenido dependiendo si el sidenav está abierto o cerrado
  sidenavMargin() {
    return this.isSidenavOpen ? '240px' : '65px';
  }

  // Método para hacer logout
  logout() {
    this.authService.logout();
  }

  collapsed = signal(false);

  // Definición de los elementos del menú
  menuItems = signal<MenuItem[]>([
    {
      icon: 'people',
      label: 'Alumnos',
      route: 'alumnos/E',
    },
    {
      icon: 'settings_accessibility',
      label: 'Docentes',
      route: 'docentes/D',
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

  // Toggle para los subitems dentro del menú
  toggleMenu(item: MenuItem) {
    item.expanded = !item.expanded;
  }

  // Propiedad calculada para el tamaño del sidenav (basado en si está colapsado o no)
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '240px'));

  // Tamaño dinámico del logo
  logoPicSize = computed(() => (this.collapsed() ? '32' : '160')); // Tamaño dinámico del logo

  // Método para colapsar o expandir el menú
  collapseAll() {
    this.collapsed.set(!this.collapsed());
    if (this.collapsed()) {
      this.menuItems().forEach((item) => {
        item.expanded = false; // Colapsa todos los subitems al cerrar el menú
      });
    }
  }
}

# Dashboard "Tableta" — estilo GlassHome Midnight

Dashboard kiosk para tablet (iPad/Android) con look Midnight Glass: fondo azul petróleo, glows cian, tiles con gradiente propio.

## Requisitos

1. **Theme** → copia `themes/glasshome.yaml` a `<config>/themes/` y asegúrate de tener en `configuration.yaml`:
   ```yaml
   frontend:
     themes: !include_dir_merge_named themes
   ```

2. **Plugins frontend** (3): **Mushroom**, **card-mod** y **kiosk-mode**.
   - Ruta fácil: instálalos desde **HACS** (los tres están ahí) y HACS registra los recursos solo.
   - Ruta manual: copia la carpeta `www/community/` de este paquete a `<config>/www/community/` y registra cada uno en *Ajustes → Paneles de control → ⋮ → Recursos* como módulo JavaScript:
     - `/local/community/mushroom/mushroom.js`
     - `/local/community/card-mod/card-mod.js`
     - `/local/community/kiosk-mode/kiosk-mode.js`

3. **Dashboard** → copia `dashboards/tableta.yaml` a `<config>/dashboards/` y decláralo en `configuration.yaml`:
   ```yaml
   lovelace:
     mode: storage
     dashboards:
       lovelace-tableta:
         mode: yaml
         filename: dashboards/tableta.yaml
         title: Tableta
         icon: mdi:tablet
         show_in_sidebar: true
         require_admin: false
   ```
   (Si ya tienes bloque `lovelace:`, añade solo la entrada dentro de `dashboards:`.)

4. Reinicia Home Assistant. El dashboard queda en `/lovelace-tableta/tableta-casa`.

## ⚠️ Adaptar entidades (obligatorio)

El YAML usa identificadores de ejemplo que no corresponden a una instalación real. Sustitúyelos por tus entidades en `tableta.yaml`:

| Placeholder | Qué representa |
|---|---|
| `weather.example_home` | Entidad de clima |
| `light.example_light_01` … `light.example_light_07` | Luces de ejemplo |
| `sensor.example_temperature_01` … `07` | Sensores de temperatura |
| `sensor.example_humidity_01` … `07` | Sensores de humedad |
| `sensor.example_energy_power`, `sensor.example_energy_battery` | Producción energética y nivel de batería opcionales |
| `binary_sensor.example_door` | Sensor de puerta |
| `sensor.example_battery_01` … `09` | Nivel de batería de sensores |
| `sensor.example_tablet_battery` | Nivel de batería de una tableta |
| `sensor.example_phone_battery`, `sensor.example_phone_network` | Datos opcionales de un móvil |

Cualquier tile cuya entidad no exista se puede borrar sin romper el resto.

## Notas

- `kiosk_mode: {kiosk: true}` en la raíz del YAML oculta header y sidebar **siempre** en este dashboard. Para escapar: añade `?disable_km` a la URL.
- Al editar el YAML, HA cachea: recarga con ⋮ del dashboard → *Refrescar* o reiniciando HA; recargar el navegador no basta.
- Diseñado para viewport ~1180px (iPad horizontal): la vista crea 3 columnas y la sección full-span tiene grid interno de 36 unidades (tercio = `columns: 12`, mitad = `columns: 18`).

// Author: @infused-kim
//
// A reversible footprint for the nice!nano (or any pro-micro compatible
// controller) that uses jumpers instead of two rows socket rows to achieve
// reversablity.
//
// This is a re-implementation of the promicro_pretty footprint made popular
// by @benvallack.
//
// The following improvements have been made:
//    1. It uses real traces instead of pads, which gets rid of hundreds of
//       DRC errors.
//    2. It leaves more space between the vias to allow easier routing through
//       the middle of the footprint
//
//
// # Placement and jumper soldering:
// The footprint is meant to be used with a nice!nano (or any other pro micro
// compatible board) that is placed on the top side of the PCB with the
// components facing down.
//
// This means when you look down at it, the RAW pin is in the upper left
// corner and the 006 pin in the upper right corner.
//
// To make it work in this configuration, you solder the jumpers on the
// OPPOSITE side.
//
// Due to the way how this footprint works, you can also place it with the
// components facing up or even at the bottom. You just need to make sure you
// solder the jumpers on the correct side.
//
// Regardless, the silkscreen labels are displayed in location that match when
// the controller is placed with the components facing down.
//
// # Credits
// This footprint was created from scratch, but is based on the ideas from
// these footprints:
// https://github.com/Albert-IV/ergogen-contrib/blob/main/src/footprints/promicro_pretty.js
// https://github.com/50an6xy06r6n/keyboard_reversible.pretty

module.exports = {
  params: {
    designator: "MCU",
    side: 'F',

    // Right Row
    RAW5V: { type: "net", value: "RAW5V" },
    GND: { type: "net", value: "GND" },
    RAW3V3: { type: "net", value: "RAW3V3" },
    P10: { type: "net", value: "P10" },
    P9: { type: "net", value: "P9" },
    P8: { type: "net", value: "P8" },
    P7: { type: "net", value: "P7" },

    // Left Row
    P0: { type: "net", value: "P0" },
    P1: { type: "net", value: "P1" },
    P2: { type: "net", value: "P2" },
    P3: { type: "net", value: "P3" },
    P4: { type: "net", value: "P4" },
    P5: { type: "net", value: "P5" },
    P6: { type: "net", value: "P6" },

    // Main Cutout
    SWCLK: { type: "net", value: "SWCLK" },
    SWDIO: { type: "net", value: "SWDIO" },
    // GND Again
    RST: { type: "net", value: "RST" },

    // Power Cutout
    BAT_POS: { type: "net", value: "BAT_POS" },
    BAT_NEG: { type: "net", value: "BAT_NEG" },

    // NFC Cutout
    NFC0: { type: "net", value: "NFC0" },
    NFC1: { type: "net", value: "NFC1" },

    traces: true,
    instructions: true,
    silk_labels: true,
    via_labels: true,

    RAW5V_label: "",
    GND_label: "",
    RAW3V3_label: "",
    P10_label: "",
    P9_label: "",
    P8_label: "",
    P7_label: "",

    P0_label: "",
    P1_label: "",
    P2_label: "",
    P3_label: "",
    P4_label: "",
    P5_label: "",
    P6_label: "",

    // Main Cutout
    SWCLK_label: "",
    SWDIO_label: "",
    // GND Again
    RST_label: "",

    // Power Cutout
    BAT_POS_label: "",
    BAT_NEG_label: "",

    // NFC Cutout
    NFC0_label: "",
    NFC1_label: "",
  },
  body: p => {
    const top = `
      ${'' /* Add parts that should be on both sides here (module def) */}
        ${p.at /* parametric position */}
    `
    const front = `
    ${'' /* Add the parts that should be on the front here */}

    `
    const back = `
    ${'' /* Add the parts that should be on the back here */}

    `

    const bottom = `
    ${'' /* Add parts that should be on both sides here (closing bracket) */}
    )
    `

    let final = top;

    if(p.side == "F" || p.reverse) {
      final += front;
    }
    if(p.side == "B" || p.reverse) {
      final += back;
    }

    final += bottom;

    return final;
  }
}
//   body: (p) => {  
//     /*These constants are the magic of this code, they allow us to adjust almost everything important aspect of the microcontroller.
//     The reason this is helpfull is that if you don't want to use a Seeed Xiao you can easily adjust the paramiters to make a different microcontroller.
    
//     top_left_pin: This is the position of the top left pin of the microcontroller.
//     top_right_pin: This is the position of the top right pin of the microcontroller.
//     pin_dist: The distance in between each pin horizontaly
//     total_pin_num: The total number of pins the microcontroller has. This number must be divisable by two.
//     pin_to_male_pad: The distance from the pin on the microcontroller to the male pad.
//     pin_to_female_pad: The distance from the pin on te microcontroller to the female pad.
//     pin_to_via: the distance from the pin on the microcontroller to the via.
//     */
//     const spacing = {
//       top_left_pin: { x: -7.62, y: -7.62 },
//       top_right_pin: { x: 7.62, y: -7.62 },
//       pin_dist: 2.54,
//       total_pin_num: 14, // Must be divisable by 2
//       pin_to_male_pad: 2,
//       pin_to_female_pad: 2.845,
//       pin_to_via: 4.358,
//     };

//     const get_pin_net_name = (p, pin_name) => {
//       return p[pin_name].name;
//     };

//     const get_pin_net_str = (p, pin_name) => {
//       return p[pin_name].str;
//     };

//     const get_pin_label_override = (p, pin_name) => {
//       prop_name = `${pin_name}_label`;
//       return p[prop_name];
//     };

//     const get_pin_label = (p, pin_name) => {
//       label = get_pin_label_override(p, pin_name);
//       if (label == "") {
//         label = get_pin_net_name(p, pin_name);
//       }

//       if (label === undefined) {
//         label = '""';
//       }

//       return label;
//     };

//     const get_at_coordinates = () => {
//       const pattern = /\(at (-?[\d\.]*) (-?[\d\.]*) (-?[\d\.]*)\)/;
//       const matches = p.at.match(pattern);
//       if (matches && matches.length == 4) {
//         return [
//           parseFloat(matches[1]),
//           parseFloat(matches[2]),
//           parseFloat(matches[3]),
//         ];
//       } else {
//         return null;
//       }
//     };

//     const adjust_point = (x, y) => {
//       const at_l = get_at_coordinates();
//       if (at_l == null) {
//         throw new Error(`Could not get x and y coordinates from p.at: ${p.at}`);
//       }
//       const at_x = at_l[0];
//       const at_y = at_l[1];
//       const at_angle = at_l[2];
//       const adj_x = at_x + x;
//       const adj_y = at_y + y;

//       const radians = (Math.PI / 180) * at_angle,
//         cos = Math.cos(radians),
//         sin = Math.sin(radians),
//         nx = cos * (adj_x - at_x) + sin * (adj_y - at_y) + at_x,
//         ny = cos * (adj_y - at_y) - sin * (adj_x - at_x) + at_y;

//       const point_str = `${nx.toFixed(2)} ${ny.toFixed(2)}`;
//       return point_str;
//     };

//     const gen_traces_row = (row_num) => {
//       const traces = `
//         (segment (start ${adjust_point(
//           4.775,
//           -12.7 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         3.262,
//         -12.7 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer F.Cu) (net 1))
//         (segment (start ${adjust_point(
//           -4.335002,
//           -12.7 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         -3.610001,
//         -11.974999 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer B.Cu) (net 1))
//         (segment (start ${adjust_point(
//           -4.775,
//           -12.7 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         -4.335002,
//         -12.7 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer B.Cu) (net 1))
//         (segment (start ${adjust_point(
//           -3.610001,
//           -11.974999 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         -2.913999,
//         -11.974999 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer B.Cu) (net 1))
//         (segment (start ${adjust_point(
//           -2.536999,
//           -12.351999 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         -2.536999,
//         -12.363001 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer B.Cu) (net 1))
//         (segment (start ${adjust_point(
//           -2.913999,
//           -11.974999 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         -2.536999,
//         -12.351999 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer B.Cu) (net 1))
//         (segment (start ${adjust_point(
//           -2.536999,
//           -12.363001 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         -2.45,
//         -12.45 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer B.Cu) (net 1))
//         (segment (start ${adjust_point(
//           3.012,
//           -12.45 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         3.262,
//         -12.7 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer B.Cu) (net 1))
//         (segment (start ${adjust_point(
//           -2.45,
//           -12.45 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         3.012,
//         -12.45 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer B.Cu) (net 1))
//         (segment (start ${adjust_point(
//           -4.775,
//           -12.7 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         -3.262,
//         -12.7 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer F.Cu) (net 13))
//         (segment (start ${adjust_point(
//           3.610001,
//           -13.425001 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         2.913999,
//         -13.425001 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer B.Cu) (net 13))
//         (segment (start ${adjust_point(
//           4.335002,
//           -12.7 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         3.610001,
//         -13.425001 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer B.Cu) (net 13))
//         (segment (start ${adjust_point(
//           4.775,
//           -12.7 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         4.335002,
//         -12.7 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer B.Cu) (net 13))
//         (segment (start ${adjust_point(
//           2.913999,
//           -13.425001 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         2.438998,
//         -12.95 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer B.Cu) (net 13))
//         (segment (start ${adjust_point(
//           -3.012,
//           -12.95 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         -3.262,
//         -12.7 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer B.Cu) (net 13))
//         (segment (start ${adjust_point(
//           2.438998,
//           -12.95 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         -3.012,
//         -12.95 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer B.Cu) (net 13))
//         (segment (start ${adjust_point(
//           -7.62,
//           -12.7 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         -5.5,
//         -12.7 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer F.Cu) (net 23))
//         (segment (start ${adjust_point(
//           -7.62,
//           -12.7 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         -5.5,
//         -12.7 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer B.Cu) (net 23))
//         (segment (start ${adjust_point(
//           5.5,
//           -12.7 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         7.62,
//         -12.7 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer F.Cu) (net 24))
//         (segment (start ${adjust_point(
//           7.62,
//           -12.7 + row_num * spacing.pin_dist
//         )}) (end ${adjust_point(
//         5.5,
//         -12.7 + row_num * spacing.pin_dist
//       )}) (width 0.25) (layer B.Cu) (net 24))
//       `;

//       return traces;
//     };

//     const gen_traces = () => {
//       let traces = "";
//       for (let i = 0; i < spacing.total_pin_num/2; i++) {
//         row_traces = gen_traces_row(i);
//         traces += row_traces;
//       }

//       return traces;
//     };

//     const gen_socket_row = (
//       row_num,
//       pin_name_left,
//       pin_name_right,
//       show_via_labels,
//       show_silk_labels
//     ) => {
//       const row_offset_y = spacing.pin_dist * row_num;

//       const socket_hole_num_left = 14 - row_num;
//       const socket_hole_num_right = 1 + row_num;
//       const via_num_left = 124 - row_num;
//       const via_num_right = 1 + row_num;

//       const net_left = get_pin_net_str(p, pin_name_left);
//       const net_right = get_pin_net_str(p, pin_name_right);
//       const via_label_left = get_pin_label(p, pin_name_left);
//       const via_label_right = get_pin_label(p, pin_name_right);

//       // These are the silkscreen labels that will be printed on the PCB.
//       // They tell us the orientation if the controller is placed with
//       // the components down, on top of the PCB and the jumpers are
//       // soldered on the opposite side than the controller.
//       const net_silk_front_left = via_label_right;
//       const net_silk_front_right = via_label_left;
//       const net_silk_back_left = via_label_left;
//       const net_silk_back_right = via_label_right;

//       let socket_row = `
//         ${"" /* Socket Holes */}
//         (pad ${socket_hole_num_left} thru_hole circle (at -7.62 ${
//         -12.7 + row_offset_y
//       }) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${
//         p.local_net(socket_hole_num_left).str
//       })
//         (pad ${socket_hole_num_right} thru_hole circle (at 7.62 ${
//         -12.7 + row_offset_y
//       }) (size 1.7 1.7) (drill 1) (layers *.Cu *.Mask) ${
//         p.local_net(socket_hole_num_right).str
//       })

//         ${"" /* Inside VIAS */}
//         (pad ${via_num_left} thru_hole circle (at -3.262 ${
//         -12.7 + row_offset_y
//       }) (size 0.8 0.8) (drill 0.4) (layers *.Cu *.Mask) ${net_left})
//         (pad ${via_num_right} thru_hole circle (at 3.262 ${
//         -12.7 + row_offset_y
//       }) (size 0.8 0.8) (drill 0.4) (layers *.Cu *.Mask) ${net_right})

//         ${"" /* Jumper Pads - Front Left */}
//         (pad ${socket_hole_num_left} smd custom (at -5.5 ${
//         -12.7 + row_offset_y
//       }) (size 0.2 0.2) (layers F.Cu F.Mask) ${
//         p.local_net(socket_hole_num_left).str
//       }
//           (zone_connect 2)
//           (options (clearance outline) (anchor rect))
//           (primitives
//             (gr_poly (pts
//               (xy -0.5 -0.625) (xy -0.25 -0.625) (xy 0.25 0) (xy -0.25 0.625) (xy -0.5 0.625)
//           ) (width 0))
//         ))
//         (pad ${via_num_left} smd custom (at -4.775 ${
//         -12.7 + row_offset_y
//       }) (size 0.2 0.2) (layers F.Cu F.Mask) ${net_left}
//           (zone_connect 2)
//           (options (clearance outline) (anchor rect))
//           (primitives
//             (gr_poly (pts
//               (xy -0.65 -0.625) (xy 0.5 -0.625) (xy 0.5 0.625) (xy -0.65 0.625) (xy -0.15 0)
//           ) (width 0))
//         ))

//         ${"" /* Jumper Pads - Front Right */}
//         (pad ${via_num_right} smd custom (at 4.775 ${
//         -12.7 + row_offset_y
//       } 180) (size 0.2 0.2) (layers F.Cu F.Mask) ${net_right}
//           (zone_connect 2)
//           (options (clearance outline) (anchor rect))
//           (primitives
//             (gr_poly (pts
//               (xy -0.65 -0.625) (xy 0.5 -0.625) (xy 0.5 0.625) (xy -0.65 0.625) (xy -0.15 0)
//           ) (width 0))
//         ))
//         (pad ${socket_hole_num_right} smd custom (at 5.5 ${
//         -12.7 + row_offset_y
//       } 180) (size 0.2 0.2) (layers F.Cu F.Mask) ${
//         p.local_net(socket_hole_num_right).str
//       }
//           (zone_connect 2)
//           (options (clearance outline) (anchor rect))
//           (primitives
//             (gr_poly (pts
//               (xy -0.5 -0.625) (xy -0.25 -0.625) (xy 0.25 0) (xy -0.25 0.625) (xy -0.5 0.625)
//           ) (width 0))
//         ))

//         ${"" /* Jumper Pads - Back Left */}
//         (pad ${socket_hole_num_left} smd custom (at -5.5 ${
//         -12.7 + row_offset_y
//       }) (size 0.2 0.2) (layers B.Cu B.Mask) ${
//         p.local_net(socket_hole_num_left).str
//       }
//           (zone_connect 2)
//           (options (clearance outline) (anchor rect))
//           (primitives
//             (gr_poly (pts
//               (xy -0.5 0.625) (xy -0.25 0.625) (xy 0.25 0) (xy -0.25 -0.625) (xy -0.5 -0.625)
//           ) (width 0))
//         ))

//         (pad ${via_num_right} smd custom (at -4.775 ${
//         -12.7 + row_offset_y
//       }) (size 0.2 0.2) (layers B.Cu B.Mask) ${net_right}
//           (zone_connect 2)
//           (options (clearance outline) (anchor rect))
//           (primitives
//             (gr_poly (pts
//               (xy -0.65 0.625) (xy 0.5 0.625) (xy 0.5 -0.625) (xy -0.65 -0.625) (xy -0.15 0)
//           ) (width 0))
//         ))

//         ${"" /* Jumper Pads - Back Right */}
//         (pad ${via_num_left} smd custom (at 4.775 ${
//         -12.7 + row_offset_y
//       } 180) (size 0.2 0.2) (layers B.Cu B.Mask) ${net_left}
//           (zone_connect 2)
//           (options (clearance outline) (anchor rect))
//           (primitives
//             (gr_poly (pts
//               (xy -0.65 0.625) (xy 0.5 0.625) (xy 0.5 -0.625) (xy -0.65 -0.625) (xy -0.15 0)
//           ) (width 0))
//         ))
//         (pad ${socket_hole_num_right} smd custom (at 5.5 ${
//         -12.7 + row_offset_y
//       } 180) (size 0.2 0.2) (layers B.Cu B.Mask) ${
//         p.local_net(socket_hole_num_right).str
//       }
//           (zone_connect 2)
//           (options (clearance outline) (anchor rect))
//           (primitives
//             (gr_poly (pts
//               (xy -0.5 0.625) (xy -0.25 0.625) (xy 0.25 0) (xy -0.25 -0.625) (xy -0.5 -0.625)
//           ) (width 0))
//         ))
//       `;

//       if (show_silk_labels == true) {
//         socket_row += `

//           ${"" /* Silkscreen Labels - Front */}
//           (fp_text user ${net_silk_front_left} (at -3 ${
//           -12.7 + row_offset_y
//         }) (layer F.SilkS)
//             (effects (font (size 1 1) (thickness 0.15)) (justify left))
//           )
//           (fp_text user ${net_silk_front_right} (at 3 ${
//           -12.7 + row_offset_y
//         }) (layer F.SilkS)
//             (effects (font (size 1 1) (thickness 0.15)) (justify right))
//           )

//           ${"" /* Silkscreen Labels - Back */}
//           (fp_text user ${net_silk_back_left} (at -3 ${
//           -12.7 + row_offset_y
//         } 180) (layer B.SilkS)
//             (effects (font (size 1 1) (thickness 0.15)) (justify right mirror))
//           )
//           (fp_text user ${net_silk_back_right} (at 3 ${
//           -12.7 + row_offset_y
//         } 180) (layer B.SilkS)
//             (effects (font (size 1 1) (thickness 0.15)) (justify left mirror))
//           )
//         `;
//       }

//       if (show_via_labels == true) {
//         socket_row += `
//           ${"" /* Via Labels - Front */}
//           (fp_text user ${via_label_left} (at -3.262 ${
//           -13.5 + row_offset_y
//         }) (layer F.Fab)
//             (effects (font (size 0.5 0.5) (thickness 0.08)))
//           )
//           (fp_text user ${via_label_right} (at 3.262 ${
//           -13.5 + row_offset_y
//         }) (layer F.Fab)
//             (effects (font (size 0.5 0.5) (thickness 0.08)))
//           )

//           ${"" /* Via Labels - Back */}
//           (fp_text user ${via_label_left} (at -3.262 ${
//           -13.5 + row_offset_y
//         } 180) (layer B.Fab)
//             (effects (font (size 0.5 0.5) (thickness 0.08)) (justify mirror))
//           )
//           (fp_text user ${via_label_right} (at 3.262 ${
//           -13.5 + row_offset_y
//         } 180) (layer B.Fab)
//             (effects (font (size 0.5 0.5) (thickness 0.08)) (justify mirror))
//           )
//         `;
//       }

//       return socket_row;
//     };

//     const gen_socket_rows = (show_via_labels, show_silk_labels) => {
//       const pin_names = [
//         ["P0", "RAW5V"],
//         ["P1", "GND"],
//         ["P2", "RAW3V3"],
//         ["P3", "P10"],
//         ["P4", "P9"],
//         ["P5", "P8"],
//         ["P6", "P7"],
//       ];
//       let socket_rows = "";
//       for (let i = 0; i < pin_names.length; i++) {
//         pin_name_left = pin_names[i][0];
//         pin_name_right = pin_names[i][1];

//         const socket_row = gen_socket_row(
//           i,
//           pin_name_left,
//           pin_name_right,
//           show_via_labels,
//           show_silk_labels
//         );

//         socket_rows += socket_row;
//       }

//       return socket_rows;
//     };

//     const common_top = `
//       (module nice_nano (layer F.Cu) (tedit 6451A4F1)
//         (attr virtual)
//         ${p.at /* parametric position */}
//         (fp_text reference "${p.ref}" (at 0 -15) (layer F.SilkS) ${p.ref_hide}
//           (effects (font (size 1 1) (thickness 0.15)))
//         )

//         ${"" /* USB Socket Outline */}
//         (fp_line (start 3.556 -18.034) (end 3.556 -16.5) (layer Dwgs.User) (width 0.15))
//         (fp_line (start -3.81 -16.5) (end -3.81 -18.034) (layer Dwgs.User) (width 0.15))
//         (fp_line (start -3.81 -18.034) (end 3.556 -18.034) (layer Dwgs.User) (width 0.15))

//         ${"" /* Courtyard Outline */}
//         (fp_line (start 8.89 16.5) (end 8.89 -14.03) (layer F.CrtYd) (width 0.15))
//         (fp_line (start 8.89 -14.03) (end 6.29 -14.03) (layer F.CrtYd) (width 0.15))
//         (fp_line (start 6.29 -14.03) (end 6.29 -13.675) (layer F.CrtYd) (width 0.15))
//         (fp_line (start 6.29 -13.67) (end 2.525 -13.67) (layer F.CrtYd) (width 0.15))
//         (fp_line (start 2.525 -13.67) (end 2.525 -13.4) (layer F.CrtYd) (width 0.15))
//         (fp_line (start 2.525 -13.4) (end -3.9 -13.4) (layer F.CrtYd) (width 0.15))
//         (fp_line (start -3.9 -13.4) (end -3.9 -13.67) (layer F.CrtYd) (width 0.15))
//         (fp_line (start -3.9 -13.67) (end -6.29 -13.67) (layer F.CrtYd) (width 0.15))
//         (fp_line (start -6.29 -13.67) (end -6.29 -14.03) (layer F.CrtYd) (width 0.15))
//         (fp_line (start -6.29 -14.03) (end -8.89 -14.03) (layer F.CrtYd) (width 0.15))
//         (fp_line (start -8.89 -14.03) (end -8.89 16.5) (layer F.CrtYd) (width 0.15))
//         (fp_line (start -8.89 16.5) (end 8.89 16.5) (layer F.CrtYd) (width 0.15))

//         (fp_line (start -8.89 16.5) (end -8.89 -14.03) (layer B.CrtYd) (width 0.15))
//         (fp_line (start -8.89 -14.03) (end -6.29 -14.03) (layer B.CrtYd) (width 0.15))
//         (fp_line (start -6.29 -14.03) (end -6.29 -13.67) (layer B.CrtYd) (width 0.15))
//         (fp_line (start -6.29 -13.67) (end -3.9 -13.67) (layer B.CrtYd) (width 0.15))
//         (fp_line (start -3.9 -13.67) (end -3.9 -13.4) (layer B.CrtYd) (width 0.15))
//         (fp_line (start -3.9 -13.4) (end 2.525 -13.4) (layer B.CrtYd) (width 0.15))
//         (fp_line (start 2.525 -13.4) (end 2.525 -13.67) (layer B.CrtYd) (width 0.15))
//         (fp_line (start 2.525 -13.67) (end 6.29 -13.67) (layer B.CrtYd) (width 0.15))
//         (fp_line (start 6.29 -13.67) (end 6.29 -14.03) (layer B.CrtYd) (width 0.15))
//         (fp_line (start 6.29 -14.03) (end 8.89 -14.03) (layer B.CrtYd) (width 0.15))
//         (fp_line (start 8.89 -14.03) (end 8.89 16.5) (layer B.CrtYd) (width 0.15))
//         (fp_line (start 8.89 16.5) (end -8.89 16.5) (layer B.CrtYd) (width 0.15))


//         ${"" /* Controller top part outline */}
//         (fp_line (start -8.89 -16.5) (end 8.89 -16.5) (layer F.Fab) (width 0.12))
//         (fp_line (start -8.89 -16.5) (end -8.89 -14) (layer F.Fab) (width 0.12))
//         (fp_line (start 8.89 -16.5) (end 8.89 -14) (layer F.Fab) (width 0.12))
//         (fp_line (start -8.89 -16.5) (end -8.89 -13.99) (layer B.Fab) (width 0.12))
//         (fp_line (start 8.89 -16.5) (end 8.89 -14) (layer B.Fab) (width 0.12))
//         (fp_line (start -8.89 -16.5) (end 8.89 -16.5) (layer B.Fab) (width 0.12))

//         ${"" /* Socket outlines */}
//         (fp_line (start 6.29 -11.43) (end 8.95 -11.43) (layer F.SilkS) (width 0.12))
//         (fp_line (start 6.29 -14.03) (end 8.95 -14.03) (layer F.SilkS) (width 0.12))
//         (fp_line (start 6.29 -14.03) (end 6.29 16.57) (layer F.SilkS) (width 0.12))
//         (fp_line (start 6.29 16.57) (end 8.95 16.57) (layer F.SilkS) (width 0.12))
//         (fp_line (start 8.95 -14.03) (end 8.95 16.57) (layer F.SilkS) (width 0.12))
//         (fp_line (start -8.95 -14.03) (end -6.29 -14.03) (layer F.SilkS) (width 0.12))
//         (fp_line (start -8.95 -14.03) (end -8.95 16.57) (layer F.SilkS) (width 0.12))
//         (fp_line (start -8.95 16.57) (end -6.29 16.57) (layer F.SilkS) (width 0.12))
//         (fp_line (start -6.29 -14.03) (end -6.29 16.57) (layer F.SilkS) (width 0.12))
//         (fp_line (start -8.95 -11.43) (end -6.29 -11.43) (layer B.SilkS) (width 0.12))
//         (fp_line (start -6.29 -14.03) (end -8.95 -14.03) (layer B.SilkS) (width 0.12))
//         (fp_line (start -6.29 -14.03) (end -6.29 16.57) (layer B.SilkS) (width 0.12))
//         (fp_line (start -6.29 16.57) (end -8.95 16.57) (layer B.SilkS) (width 0.12))
//         (fp_line (start -8.95 -14.03) (end -8.95 16.57) (layer B.SilkS) (width 0.12))
//         (fp_line (start 8.95 -14.03) (end 6.29 -14.03) (layer B.SilkS) (width 0.12))
//         (fp_line (start 8.95 -14.03) (end 8.95 16.57) (layer B.SilkS) (width 0.12))
//         (fp_line (start 8.95 16.57) (end 6.29 16.57) (layer B.SilkS) (width 0.12))
//         (fp_line (start 6.29 -14.03) (end 6.29 16.57) (layer B.SilkS) (width 0.12))
//     `;

//     const instructions = `
//         (fp_text user "R. Side - Jumper Here" (at 0 -15.245) (layer F.SilkS)
//           (effects (font (size 1 1) (thickness 0.15)))
//         )
//         (fp_text user "L. Side - Jumper Here" (at 0 -15.245) (layer B.SilkS)
//           (effects (font (size 1 1) (thickness 0.15)) (justify mirror))
//         )
//   `;

//     const socket_rows = gen_socket_rows(p.show_via_labels, p.show_silk_labels);
//     const traces = gen_traces();

//     return `
//         ${"" /* Controller*/}
//         ${common_top}
//         ${socket_rows}
//         ${p.show_instructions ? instructions : ""}
//       )

//       ${"" /* Traces */}
//       ${p.traces ? traces : ""}
//   `;
//   },
// };

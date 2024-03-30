// Panasonic EVQWGD001 horizontal rotary encoder
//
//   __________________
//  (f) (t)         | |
//  | (1)           | |
//  | (2)           | |
//  | (3)           | |
//  | (4)           | |
//  |_( )___________|_|
//
// Nets
//    from: corresponds to switch pin 1 (for button presses)
//    to: corresponds to switch pin 2 (for button presses)
//    A: corresponds to pin 1 (for rotary)
//    B: corresponds to pin 2 (for rotary, should be GND)
//    C: corresponds to pin 3 (for rotary)
//    D: corresponds to pin 4 (for rotary, unused)
// Params
//    reverse: default is false
//      if true, will flip the footprint such that the pcb can be reversible

module.exports = {
  params: {
    designator: "S",
    reverse: false,
    from: undefined,
    to: undefined,
    A: undefined,
    B: undefined,
    C: undefined,
    D: undefined,
  },
  body: (p) => {
    const perimeter = {
      x: 16.6,
      y: 13.8,
    };

    const pin_dimension = {
      button: 0.7,
      roller: 0.8,
    };

    const arc = {
      length: 0.3,
      angle: 90,
    };

    const edge_cuts = {
      x_narrow: 1.25,
      x_long: 2.7,
      y_top: 1.3,
      y_bottom: 2.5,
      y_middle: 4.0,
      y_protrude: 3.0,
    };

    const standard = `
        (module RollerEncoder_Panasonic_EVQWGD001 (layer F.Cu) (tedit 6040A10C)
        ${p.at /* parametric position */}   
        (fp_text reference REF** (at 0 0 ${p.r})
            (layer F.Fab) (effects (font (size 1 1) (thickness 0.15))))
        (fp_text value RollerEncoder_Panasonic_EVQWGD001 (at -0.1 9 ${p.r})
            (layer F.Fab) (effects (font (size 1 1) (thickness 0.15))))
        
        ${"" /* corner marks */}
        (fp_line
          (start -${perimeter.x / 2} -${perimeter.y / 2})
          (end ${perimeter.x / 2} -${perimeter.y / 2})
          (layer Dwgs.User)
          (width 0.12)
        )
        (fp_line
          (start ${perimeter.x / 2} -${perimeter.y / 2})
          (end ${perimeter.x / 2} ${perimeter.y / 2})
          (layer Dwgs.User)
          (width 0.12)
        )
        (fp_line
          (start ${perimeter.x / 2} ${perimeter.y / 2})
          (end -${perimeter.x / 2} ${perimeter.y / 2})
          (layer Dwgs.User)
          (width 0.12)
        )
        (fp_line
          (start -${perimeter.x / 2} ${perimeter.y / 2})
          (end -${perimeter.x / 2} -${perimeter.y / 2})
          (layer Dwgs.User)
          (width 0.12)
        )
      `;
    function pins(def_neg, def_pos) {
      // top-right to bottom-right
      // bottom-right to inner bottom-right
      //   __________________
      //  (f) (t)   2.5y  | |
      //  | (1)     3.0y |  |
      //  | (2)     4.0y  | |
      //  | (3)           | |
      //  | (4)     3.0y |  |
      //  |_( )_____1.3y__|_|
      return `
          ${"" /* edge cuts */}
          (fp_line (start -8.3 -6.9) (end 8.3 -6.9)
            (stroke (width 0.15) (type solid)) (layer "Dwgs.User"))
          (fp_line (start -8.3 6.9) (end -8.3 -6.9)
            (stroke (width 0.15) (type solid)) (layer "Dwgs.User"))
          (fp_line (start 8.3 -6.9) (end 8.3 6.9)
            (stroke (width 0.15) (type solid)) (layer "Dwgs.User"))
          (fp_line (start 8.3 6.9) (end -8.3 6.9)
            (stroke (width 0.15) (type solid)) (layer "Dwgs.User"))
          (fp_line (start 5.4 -5) (end 5.4 -2.6)
            (stroke (width 0.15) (type default)) (layer "Edge.Cuts"))
          (fp_line (start 5.4 2.4) (end 5.4 4.8)
            (stroke (width 0.15) (type default)) (layer "Edge.Cuts"))
          (fp_line (start 6.45 -5.3) (end 5.7 -5.3)
            (stroke (width 0.15) (type default)) (layer "Edge.Cuts"))
          (fp_line (start 6.45 -2.3) (end 5.7 -2.3)
            (stroke (width 0.15) (type default)) (layer "Edge.Cuts"))
          (fp_line (start 6.45 2.1) (end 5.7 2.1)
            (stroke (width 0.15) (type default)) (layer "Edge.Cuts"))
          (fp_line (start 6.45 5.1) (end 5.7 5.1)
            (stroke (width 0.15) (type default)) (layer "Edge.Cuts"))
          (fp_line (start 6.75 -6.9) (end 6.75 -5.6)
            (stroke (width 0.15) (type default)) (layer "Edge.Cuts"))
          (fp_line (start 6.75 -2) (end 6.75 1.8)
            (stroke (width 0.15) (type default)) (layer "Edge.Cuts"))
          (fp_line (start 6.75 5.4) (end 6.75 6.9)
            (stroke (width 0.15) (type default)) (layer "Edge.Cuts"))
          (fp_line (start 7.05 7.2) (end 8.3 7.2)
            (stroke (width 0.15) (type solid)) (layer "Edge.Cuts"))

          (fp_line (start 8.3 -7.2) (end 7.05 -7.2)
            (stroke (width 0.15) (type solid)) (layer "Edge.Cuts"))

          (fp_arc (start 8.6 6.9) (end 8.3 7.2)
            (stroke (width 0.15) (type solid)) (layer "Edge.Cuts"))

          (fp_line (start 8.6 6.9) (end 8.6 -6.9)
            (stroke (width 0.15) (type solid)) (layer "Edge.Cuts"))

            (fp_arc (start 5.4 -5) (mid 5.487868 -5.212132) (end 5.7 -5.3)
            (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (tstamp 1c045f6e-c78e-41d7-90c7-f24bd70dae19))
          (fp_arc (start 5.4 2.4) (mid 5.487868 2.187868) (end 5.7 2.1)
            (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (tstamp 3f77ce5a-4da6-4e9f-99cd-06fe9c9bd0a7))
          (fp_arc (start 5.7 -2.3) (mid 5.487868 -2.387868) (end 5.4 -2.6)
            (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (tstamp b0d38d51-caad-4968-909f-b4ffa253a04c))
          (fp_arc (start 5.7 5.1) (mid 5.487868 5.012132) (end 5.4 4.8)
            (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (tstamp d76e53d7-bc8e-4bc5-80e7-9ec930a3bbbb))
          (fp_arc (start 6.45 -2.3) (mid 6.662132 -2.212132) (end 6.75 -2)
            (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (tstamp ff7af5a7-152b-421f-b994-934cb9e2255b))
          (fp_arc (start 6.45 5.1) (mid 6.662132 5.187868) (end 6.75 5.4)
            (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (tstamp d6e49546-e46a-4297-ae6e-97ed0e640d81))
          (fp_arc (start 6.75 -6.9) (mid 6.832331 -7.117669) (end 7.05 -7.2)
            (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (tstamp 85284940-b196-458a-b4cc-e32364b02fa7))
          (fp_arc (start 6.75 -5.6) (mid 6.662132 -5.387868) (end 6.45 -5.3)
            (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (tstamp cf463f5f-a208-48a4-b16c-e53f203d6eac))
          (fp_arc (start 6.75 1.8) (mid 6.662132 2.012132) (end 6.45 2.1)
            (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (tstamp 927b1b47-2ddc-48ef-adb0-478e55d3eb60))
          (fp_arc (start 7.05 7.2) (mid 6.837868 7.112132) (end 6.75 6.9)
            (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (tstamp d7462492-2b09-4bba-9e87-d5e56d64ca13))
          (fp_arc (start 8.3 -7.2) (mid 8.512132 -7.112132) (end 8.6 -6.9)
            (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (tstamp 59e0d321-7676-4335-85e0-c4b2050cd326))
          (fp_arc (start 8.6 6.9) (mid 8.512132 7.112132) (end 8.3 7.2)
            (stroke (width 0.15) (type solid)) (layer "Edge.Cuts") (tstamp 98e1dd66-5ef8-4eeb-ad45-aa3b62a35ebc))


          ${"" /* pins */}
          (pad S1 thru_hole circle
            (at ${def_neg}6.85 -${perimeter.y / 2} ${p.r})
            (size ${pin_dimension.button + 0.7} ${pin_dimension.button + 0.7})
            (drill ${pin_dimension.button})
            (layers *.Cu *.Mask) ${p.from}
          )
          (pad S2 thru_hole circle
            (at ${def_neg}5 -${perimeter.y / 2} ${p.r})
            (size ${pin_dimension.button + 0.7} ${pin_dimension.button + 0.7})
            (drill ${pin_dimension.button})
            (layers *.Cu *.Mask) ${p.to})
          (pad A thru_hole circle
            (at ${def_neg}5.625 -3.81 ${p.r})
            (size ${pin_dimension.roller + 0.7} ${pin_dimension.roller + 0.7})
            (drill ${pin_dimension.roller})
            (layers *.Cu *.Mask) ${p.A})
          (pad B thru_hole circle
            (at ${def_neg}5.625 -1.27 ${p.r})
            (size ${pin_dimension.roller + 0.7} ${pin_dimension.roller + 0.7})
            (drill ${pin_dimension.roller})
            (layers *.Cu *.Mask) ${p.B})
          (pad C thru_hole circle
            (at ${def_neg}5.625 1.27 ${p.r})
            (size ${pin_dimension.roller + 0.7} ${pin_dimension.roller + 0.7})
            (drill ${pin_dimension.roller})
            (layers *.Cu *.Mask) ${p.C})
          (pad D thru_hole circle
            (at ${def_neg}5.625 3.81 ${p.r})
            (size ${pin_dimension.roller + 0.7} ${pin_dimension.roller + 0.7})
            (drill ${pin_dimension.roller})
            (layers *.Cu *.Mask) ${p.D})

          ${"" /* stabilizer */}
          (pad "" np_thru_hole circle
            (at ${def_neg}5.625 6.3 ${p.r})
            (size 1.5 1.5)
            (drill 1.5)
            (layers *.Cu *.Mask))
        `;
    }
    if (p.reverse) {
      return `
        ${standard}
        ${pins("-", "")}
        ${pins("", "-")})
        `;
    } else {
      return `
        ${standard}
        ${pins("-", "")})
        `;
    }
  },
};

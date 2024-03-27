// Author: LowellCamp from discord
// Source: https://discord.com/channels/714176584269168732/847753414229491733/1112247155818774668
// https://github.com/camplowell/KicadFootprints/tree/main

module.exports = {
  nets: {
    RAW: 'RAW',
    GND: 'GND',
    RST: 'RST',
    VCC: 'VCC',
    P0: 'P0',
    P1: 'P1',
    P2: 'P2',
    P3: 'P3',
    P4: 'P4',
    P6: 'P6',
    P7: 'P7',
    P26: 'P26',
    P27: 'P27',
    P28: 'P28',
    P29: 'P29',
    BAT: 'BAT'
  },
  params: {
    class: 'MCU',
    reverse: false
  },
  body: p => {
      const standard = `
      (module ProMicro (layer F.Cu) (tedit 5B307E4C)
      ${p.at /* parametric position */}

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
      (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))
    `

    function outline(side) {
      return `
      ${''/* illustration of the (possible) USB port overhang */}
      (fp_line (start -4.5 -11.83) (end -4.5 -04.53) (layer ${side}.SilkS) (width 0.15))
      (fp_line (start  4.5 -11.83) (end -4.5 -11.83) (layer ${side}.SilkS) (width 0.15))
      (fp_line (start  4.5 -04.53) (end  4.5 -11.83) (layer ${side}.SilkS) (width 0.15))
      (fp_line (start -4.5 -04.53) (end  4.5 -04.53) (layer ${side}.SilkS) (width 0.15))
      
      ${''/* component outline */}
      (fp_arc  (start -6.75 -8.50) (end -8.75 -8.50) (angle  90) (layer ${side}.SilkS) (width 0.15))
      (fp_line (start -6.75 -10.5) (end  6.75 -10.5) (layer ${side}.SilkS) (width 0.15))
      (fp_arc  (start  6.75 -8.50) (end  8.75 -8.50) (angle -90) (layer ${side}.SilkS) (width 0.15))
      (fp_line (start  8.75 -8.50) (end  8.75  8.50) (layer ${side}.SilkS) (width 0.15))
      (fp_arc  (start  6.75  8.50) (end  8.75  8.50) (angle  90) (layer ${side}.SilkS) (width 0.15))
      (fp_line (start  6.75  10.5) (end -6.75  10.5) (layer ${side}.SilkS) (width 0.15))
      (fp_arc  (start -6.75  8.50) (end -8.75  8.50) (angle -90) (layer ${side}.SilkS) (width 0.15))
      (fp_line (start -8.75  8.50) (end -8.75 -8.50) (layer ${side}.SilkS) (width 0.15))
      `
    }

    function pins(def_neg, def_pos, side) {
      text_effects = `(font (size 0.8 0.8) (thickness 0.15))`
      if (side == 'B') {
        text_effects += ' (justify mirror)'
      }
      return `
          ${''/* pin names */}
          (fp_text user RAW (at ${def_pos}4.8 -7.62 ${p.rot}) (layer ${side}.SilkS) (effects ${text_effects}))
          (fp_text user GND (at ${def_pos}4.8 -5.08 ${p.rot}) (layer ${side}.SilkS) (effects ${text_effects}))
          (fp_text user 3V3 (at ${def_pos}4.8 -2.54 ${p.rot}) (layer ${side}.SilkS) (effects ${text_effects}))
          (fp_text user P03 (at ${def_pos}5.9  0.00 ${p.rot + 90}) (layer ${side}.SilkS) (effects ${text_effects}))
          (fp_text user P04 (at ${def_pos}4.8  2.54 ${p.rot}) (layer ${side}.SilkS) (effects ${text_effects}))
          (fp_text user P02 (at ${def_pos}4.8  5.08 ${p.rot}) (layer ${side}.SilkS) (effects ${text_effects}))
          (fp_text user P01 (at ${def_pos}4.8  7.62 ${p.rot}) (layer ${side}.SilkS) (effects ${text_effects}))


          (fp_text user P26 (at ${def_neg}4.8 -7.62 ${p.rot}) (layer ${side}.SilkS) (effects ${text_effects}))
          (fp_text user P27 (at ${def_neg}4.8 -5.08 ${p.rot}) (layer ${side}.SilkS) (effects ${text_effects}))
          (fp_text user P28 (at ${def_neg}4.8 -2.54 ${p.rot}) (layer ${side}.SilkS) (effects ${text_effects}))
          (fp_text user P29 (at ${def_neg}5.9  0.00 ${p.rot + 90}) (layer ${side}.SilkS) (effects ${text_effects}))
          (fp_text user P06 (at ${def_neg}4.8  2.54 ${p.rot}) (layer ${side}.SilkS) (effects ${text_effects}))
          (fp_text user P07 (at ${def_neg}4.8  5.08 ${p.rot}) (layer ${side}.SilkS) (effects ${text_effects}))
          (fp_text user P00 (at ${def_neg}4.8  7.62 ${p.rot}) (layer ${side}.SilkS) (effects ${text_effects}))

          (fp_text user BAT+ (at ${def_neg}2.0 -0.317 ${p.rot}) (layer ${side}.SilkS) (effects ${text_effects}))

          ${''/* and now the actual pins */}
          (pad  1 smd oval (at ${def_pos}8.1 -7.62 ${p.rot}) (size 2.75 1.8) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.RAW.str})
          (pad  2 smd oval (at ${def_pos}8.1 -5.08 ${p.rot}) (size 2.75 1.8) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.GND.str})
          (pad  3 smd oval (at ${def_pos}8.1 -2.54 ${p.rot}) (size 2.75 1.8) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.VCC.str})
          (pad  4 smd oval (at ${def_pos}8.1  0.00 ${p.rot}) (size 2.75 1.8) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.P3.str})
          (pad  5 smd oval (at ${def_pos}8.1  2.54 ${p.rot}) (size 2.75 1.8) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.P4.str})
          (pad  6 smd oval (at ${def_pos}8.1  5.08 ${p.rot}) (size 2.75 1.8) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.P2.str})
          (pad  7 smd oval (at ${def_pos}8.1  7.62 ${p.rot}) (size 2.75 1.8) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.P1.str})

          (pad  8 smd oval (at ${def_neg}8.1 -7.62 ${p.rot}) (size 2.75 1.8) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.P26.str})
          (pad  9 smd oval (at ${def_neg}8.1 -5.08 ${p.rot}) (size 2.75 1.8) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.P27.str})
          (pad 10 smd oval (at ${def_neg}8.1 -2.54 ${p.rot}) (size 2.75 1.8) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.P28.str})
          (pad 11 smd oval (at ${def_neg}8.1  0.00 ${p.rot}) (size 2.75 1.8) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.P29.str})
          (pad 12 smd oval (at ${def_neg}8.1  2.54 ${p.rot}) (size 2.75 1.8) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.P6.str})
          (pad 13 smd oval (at ${def_neg}8.1  5.08 ${p.rot}) (size 2.75 1.8) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.P7.str})
          (pad 14 smd oval (at ${def_neg}8.1  7.62 ${p.rot}) (size 2.75 1.8) (layers ${side}.Cu ${side}.Paste ${side}.Mask) ${p.net.P0.str})

          (pad 19 thru_hole circle (at ${def_neg}4.445 -0.317) (size 1.397 1.397) (drill 1.016) (layers *.Cu *.SilkS *.Mask) ${p.net.BAT.str})
      `
    }

    if (p.param.reverse) {
      return `
      ${standard}
      ${outline('F')}
      ${pins('-', '', 'F')})
      `
    } else {
      return `
      ${standard}
      ${outline('F')}
      ${outline('B')}
      ${pins('-', '', 'F')}
      ${pins('', '-', 'B')})
      `
    }

  }

}
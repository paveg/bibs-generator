import * as React from 'react';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputColor, { Color } from 'react-input-color';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) => {
  const style = createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 100,
    },
    picker: {
      '& .MuiFormControl-root': {
        margin: theme.spacing(1),
        textAlign: 'center',
      },
      '& .MuiFormControl-root > span': {
        width: 96,
        height: 36,
      },
      '& .MuiFormLabel-root': {
        padding: theme.spacing(1),
      },
    },
  });

  return style;
});

type Info = {
  [key: string]: {
    pixel: string;
    text: string;
  };
};

const saveInfo: Info = {
  electricboots: {
    pixel: '1760px',
    text: 'ELECTRICBOOTS',
  },
  arial: {
    pixel: '1600px',
    text: 'Arial',
  },
};

const getContext = (ref: MutableRefObject<any>): CanvasRenderingContext2D => {
  const ctx: CanvasRenderingContext2D = ref.current.getContext('2d');
  return ctx;
};

const BibsGenerator: React.FC = () => {
  const classes = useStyles();
  const [font, setFont] = useState<string>('electricboots');
  const [text, setText] = useState<string>('');
  const [fontColor, setFontColor] = useState<Color>({
    a: 0,
    b: 0,
    g: 0,
    h: 0,
    hex: '',
    r: 0,
    rgba: '',
    s: 0,
    v: 0,
  });
  const [backgroundColor, setBackgroundColor] = useState<Color>({
    a: 0,
    b: 0,
    g: 0,
    h: 0,
    hex: '',
    r: 0,
    rgba: '',
    s: 0,
    v: 0,
  });
  const canvasRef = useRef(null);
  const saveCanvasRef = useRef(null);

  const configureContext = (ctx: CanvasRenderingContext2D, ref: any): CanvasRenderingContext2D => {
    const canvas = ref.current;
    ctx.lineJoin = 'round';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor.hex;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, -0.18, 1, 0, 0);
    ctx.fillStyle = fontColor.hex;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 0;
    return ctx;
  };

  const onInput = (event) => {
    setText(event.target.value);
  };

  const handleChange = (event) => {
    setFont(event.target.value);
    const ctx: CanvasRenderingContext2D = getContext(canvasRef);
    ctx.font = `100px ${font}`;
  };

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = getContext(canvasRef);

    ctx.font = `100px ${font}`;
    configureContext(ctx, canvasRef);
    ctx.fillText(text, 70 + 4, 100 + 4);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }, [text, font, fontColor, backgroundColor]);

  const saveImage = () => {
    const canvas: any = saveCanvasRef.current;
    const ctx: CanvasRenderingContext2D = getContext(saveCanvasRef);
    const info = saveInfo[font];

    ctx.font = `${info.pixel} ${font}`;
    configureContext(ctx, saveCanvasRef);
    ctx.fillText(text, 324 + 4, 1500 + 4);
    const url = canvas.toDataURL('image/png', 1);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'number.png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const menuItems = Object.keys(saveInfo).map((key) => {
    const displayValue = saveInfo[key].text;

    return (
      <MenuItem key={key} value={key}>
        {displayValue}
      </MenuItem>
    );
  });

  return (
    <>
      <Box key="canvas-box" textAlign="center">
        <canvas width={400} height={150} ref={canvasRef} />
        <Divider />
      </Box>
      <Grid container spacing={2} justify="center" alignItems="flex-end">
        <Grid item>
          <Box key="color-picker-box" className={classes.picker}>
            <FormControl component="fieldset">
              <FormLabel component="legend">文字色</FormLabel>
              <InputColor
                placement="left"
                key="font-color-picker"
                initialValue="#252525"
                onChange={setFontColor}
              />
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">背景色</FormLabel>
              <InputColor
                placement="right"
                key="background-color-picker"
                initialValue="#ffffff"
                onChange={setBackgroundColor}
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item>
          <Box key="input-box">
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="select-font">Font</InputLabel>
              <Select labelId="font-label" id="select-font" value={font} onChange={handleChange}>
                {menuItems}
              </Select>
            </FormControl>
            <FormControl variant="filled" className={classes.formControl}>
              <TextField
                type="text"
                label="Number"
                id="input-number"
                variant="filled"
                required
                placeholder="1234"
                onInput={onInput}
              />
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" m={3}>
        <Button type="button" color="primary" variant="contained" onClick={saveImage}>
          <Typography variant="button">画像を保存する</Typography>
        </Button>
      </Box>
      <Box key="hide-canvas-box">
        <canvas hidden width="2893px" height="4092px" ref={saveCanvasRef} />
      </Box>
    </>
  );
};

export default BibsGenerator;

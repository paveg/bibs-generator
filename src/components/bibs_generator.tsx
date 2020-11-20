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
import ColorPicker from 'material-ui-color-picker';

const useStyles = makeStyles((theme: Theme) => {
  const style = createStyles({
    root: {
      '& .MuiButton-root, .MuiFormControl-root, .MuiSelect-root, .MuiFormControl-root': {
        margin: theme.spacing(1),
        width: 120,
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
  const [fontColor, setFontColor] = useState<string>('#252525');
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const canvasRef = useRef(null);
  const saveCanvasRef = useRef(null);

  const configureContext = (ctx: CanvasRenderingContext2D, ref: any): CanvasRenderingContext2D => {
    const canvas = ref.current;
    ctx.lineJoin = 'round';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, -0.18, 1, 0, 0);
    ctx.fillStyle = fontColor;
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

    return <MenuItem value={key}>{displayValue}</MenuItem>;
  });

  return (
    <>
      <Box textAlign="center">
        <canvas width={400} height={150} ref={canvasRef} />
        <Divider />
      </Box>
      <Box display="flex" justifyContent="center" className={classes.root} m={2}>
        <ColorPicker
          name="font-color"
          defaultValue={fontColor}
          floatingLabelText="文字色"
          value={fontColor}
          onChange={(color) => {
            setFontColor(color);
          }}
        />
        <ColorPicker
          name="background-color"
          defaultValue={backgroundColor}
          floatingLabelText="背景色"
          value={backgroundColor}
          onChange={(color) => {
            setBackgroundColor(color);
          }}
        />
      </Box>
      <Box display="flex" justifyContent="center" className={classes.root} m={1}>
        <Select labelId="font-label" id="select-font" value={font} onChange={handleChange}>
          {menuItems}
        </Select>
        <TextField
          type="text"
          id="text-box"
          variant="outlined"
          size="small"
          required
          placeholder="1234"
          onInput={onInput}
        />
        <Button size="small" type="button" color="primary" variant="contained" onClick={saveImage}>
          <Typography variant="button">画像を保存する</Typography>
        </Button>
      </Box>
      <Box>
        <canvas hidden width="2893px" height="4092px" ref={saveCanvasRef} />
      </Box>
    </>
  );
};

export default BibsGenerator;

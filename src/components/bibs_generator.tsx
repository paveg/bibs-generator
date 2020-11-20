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

const useStyles = makeStyles((theme: Theme) => {
  const style = createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 150,
      },
      '& .MuiButton-root': {
        margin: theme.spacing(1),
        width: 150,
      },
      '& .MuiSelect-root': {
        margin: theme.spacing(1),
        width: 150,
      },
    },
  });

  return style;
});

const getContext = (ref: MutableRefObject<any>): CanvasRenderingContext2D => {
  const ctx: CanvasRenderingContext2D = ref.current.getContext('2d');
  return ctx;
};

const BibsGenerator: React.FC = () => {
  const [font, setFont] = useState<string>('electricboots');
  const canvasRef = useRef(null);

  const saveCanvasRef = useRef(null);
  const classes = useStyles();
  const [text, setText] = useState<string>('');

  const onInput = (event) => {
    setText(event.target.value);
  };

  const handleChange = (event) => {
    setFont(event.target.value);
    const ctx: CanvasRenderingContext2D = getContext(canvasRef);
    ctx.font = `100px ${font}`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx: CanvasRenderingContext2D = getContext(canvasRef);
    ctx.font = `100px ${font}`;
    ctx.lineJoin = 'round';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, -0.18, 1, 0, 0);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 0;
    ctx.fillText(text, 70 + 4, 100 + 4);
  }, [text, font]);

  const saveImage = () => {
    const canvas: any = saveCanvasRef.current;
    const ctx: CanvasRenderingContext2D = getContext(saveCanvasRef);
    ctx.font = `1760px ${font}`;
    ctx.lineJoin = 'round';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(1, 0, -0.1, 1, 0, 0);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 0;
    ctx.fillText(text, 324 + 4, 1500 + 4);
    const url = canvas.toDataURL('image/png', 1);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'number.png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Box textAlign="center">
        <canvas width={400} height={150} ref={canvasRef} />
        <Divider />
      </Box>
      <Box display="flex" justifyContent="center" className={classes.root}>
        <Select labelId="font-label" id="select-font" value={font} onChange={handleChange}>
          <MenuItem value="electricboots">electricboots</MenuItem>
          <MenuItem value="Arial">Arial</MenuItem>
        </Select>
        <TextField
          type="text"
          id="text-box"
          variant="outlined"
          size="medium"
          required
          placeholder="1234"
          onInput={onInput}
        />
        <Button type="button" color="primary" variant="contained" onClick={saveImage}>
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

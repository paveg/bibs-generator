import * as React from 'react';
import { Container, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useEffect, useRef, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/styles';
// import * as PropTypes from 'prop-types';
// import loadable from '@loadable/component';

type Props = {};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 150,
      },
      '& .MuiButton-root': {
        margin: theme.spacing(1),
        width: 150,
      },
    },
  }),
);

const Index: React.FC<Props> = () => {
  const canvasRef = useRef(null);
  const classes = useStyles();
  const [text, setText] = useState<string>('1234');

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext('2d');
  };

  const onInput = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = getContext();
    const { current } = canvasRef;
    ctx.beginPath();
    ctx.font = '100px Arial';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, current.width, current.height);
    ctx.setTransform(1, 0, -0.18, 1, 0, 0);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 0;
    ctx.fillText(text, 70 + 4, 100 + 4);
  }, [text]);

  return (
    <Container maxWidth="lg">
      <Typography component="div" variant="h2">
        <Box textAlign="center" fontWeight={700}>
          Off-Road Number Generator β
        </Box>
      </Typography>
      <Box textAlign="center">
        <canvas width={800} height={150} ref={canvasRef} />
      </Box>
      <Box display="flex" justifyContent="center" className={classes.root}>
        <TextField
          type="text"
          id="text-box"
          variant="outlined"
          size="medium"
          required
          defaultValue={1234}
          onInput={onInput}
        />
        <Button type="button" color="primary" variant="contained">
          <Typography variant="button">画像を保存する</Typography>
        </Button>
      </Box>
      <Typography component="div" paragraph variant="h5">
        <Box textAlign="center" fontWeight={400}>
          オフロードバイクのゼッケン用のナンバーを作成するツールです。
          <br />
          A4に印刷しておよそ縦80~90mm（ライト付きED車のフロントマスク上にちょうど収まるサイズ）になるようにしています。
          <br />
          必要な場合はご自身で拡大・縮小をお願いします。4桁以上だとはみ出ます。
          <br />
          フォントは現在フリーのフォントを使っています。今後気が向いたら増やします。
        </Box>
      </Typography>
    </Container>
  );
};

export default Index;

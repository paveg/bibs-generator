import * as React from 'react';
import loadable from '@loadable/component';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const BibsGenerator = loadable(() => import('../components/bibs_generator'));

type Props = {};

const Index: React.FC<Props> = () => (
  <Container maxWidth="lg">
    <Typography component="div" variant="h2">
      <Box textAlign="center" fontWeight={700}>
        Off-Road Number Generator γ
      </Box>
    </Typography>
    <BibsGenerator />
    <Typography component="div" paragraph variant="h5">
      <Box textAlign="center" fontWeight={400}>
        オフロードバイクのゼッケン用のナンバーを作成するツールです。
        <br />
        A4に印刷しておよそ縦80~90mmになるようにしています（※1）。
        <br />
        必要な場合はご自身で拡大・縮小をお願いします。4桁以上だとはみ出ます。
        <br />
        フォントは現在フリーのフォントを使っています。今後気が向いたら増やします。
        <br />
        <Typography variant="caption">
          ※1: ライト付きED車のフロントマスク上にちょうど収まるサイズ
        </Typography>
      </Box>
    </Typography>
  </Container>
);

export default Index;

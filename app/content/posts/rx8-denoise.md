+++
title = "RX8 で音声のノイズをとる"
description = "録音にノイズが混じっていたので RX8 を使ってノイズをとってみた"
date = 2020-10-25T01:00:00Z
+++

<!-- TOC -->

- [{title}](#title)
    - [やったこと](#%E3%82%84%E3%81%A3%E3%81%9F%E3%81%93%E3%81%A8)
    - [使うプラグイン](#%E4%BD%BF%E3%81%86%E3%83%97%E3%83%A9%E3%82%B0%E3%82%A4%E3%83%B3)
        - [Repair Assistant](#repair-assistant)
        - [Spectal De-noise](#spectal-de-noise)
        - [Declip](#declip)
    - [まとめ](#%E3%81%BE%E3%81%A8%E3%82%81)

<!-- /TOC -->

---

# {title}

録音にノイズが混じっていたので RX8 を使ってノイズをとってみた

## やったこと

VRC で動画を撮ったものの、音にノイズが乗ったりしてしまっていたので、それを iZotope の RX8 を使って軽減した。

## 使うプラグイン

- Repair Assistant
    - Declip
    - Dehum
- Spectal De-noise
- Declip

### Repair Assistant

とりあえず全体に Repair Assistant を適用させておいた。
変わってるのかはよく分からない。

### Spectal De-noise

1. ノイズのみ鳴っている範囲を選択して解析
1. 解析したノイズがかかっている範囲全体を選択
1. 適用

指定したノイズがかなり綺麗に消えた。

### Declip

範囲を選択して適用すると、音割れしてる部分を軽減してくれる。
いい感じな気がする。

## まとめ

いいかんじ
iZotope 強い
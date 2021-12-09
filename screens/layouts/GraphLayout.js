import React from 'react';
import BlockView from '../../components/BlockView';
import GraphSwiper from '../../components/GraphSwiper';

export default function GraphLayout({calorie}) {
  return (
    <BlockView>
      <GraphSwiper calorie={calorie} />
    </BlockView>
  );
}

import React, { useState } from 'react';


function InnerContent(props) {

 	
  return (
    <div>
    	{props.isMobile?
    		<div>
				<SwipeHandler childElement={innerData} registerActions={this._swipeAction} hideActionCB={this._hideSwipeSignal} />
				<SwipeSignal show={this.state.showSwipeSignal} />
			</div>

			:

			<div>
				{props.ItemObject.DataType === 'products' ?
				<div className={"view-section-full " + this.state.classNameSide}>
					<div className='image-container'>
						 <img className="ArtWorkImg" src={'/images/'+ this.state.currentItem['DataType'] + '/' + this.state.currentItem['Url'] + '.jpg'} alt={this.state.currentItem.Title} />
					</div>
					<div className="piece-content">
					 <Stack  styles={stackStyles} tokens={stackTokens}>
					 	<Stack.Item align="stretch">
						<h1 className={'piece-content-title'}>{this.state.currentItem['Title']}</h1>
						</Stack.Item>
						<Stack.Item align="stretch">
						<DisplayText text={this.state.currentItem.Blurb} />
						</Stack.Item>
						<Stack.Item align="stretch">
						<ProductDetailsDiv productData={this.state.currentItem} addToCartCB={this.addToCart} />
						</Stack.Item>
						<Stack.Item align="stretch">
						<span className={'sub-text'}>Prices are inclusive of all taxes and shipping</span>
						</Stack.Item>
					 </Stack>
					</div>
				</div>
				:
				<div className={"view-section-full " + this.state.classNameSide} >
					<div className='image-container'>
						 <img className="ArtWorkImg" src={'/images/'+ this.state.currentItem['DataType'] + '/' + this.state.currentItem['Url'] + '.jpg'} alt={this.state.currentItem.Title} />
					</div>
					<div className="piece-content">
					<Stack styles={stackStyles} tokens={stackTokens}>
						<Stack.Item align="stretch">
						<h1 className={'piece-content-title'}>{this.state.currentItem['Title']}</h1>
						</Stack.Item>
						{this.state.currentItem.Blurb !== null?
							<Stack.Item align="stretch">
							<DisplayText text={this.state.currentItem.Blurb} />
							</Stack.Item>
							:
							null
						}
						<Stack.Item align="stretch">
						<p className='blurb'>Completed in {this.state.currentItem.PaintingYear}</p>
						</Stack.Item>
						<Stack.Item align="stretch">
						<p className='blurb'>{this.state.currentItem.Medium}</p>
						</Stack.Item>
					</Stack>
					</div>
				</div>
				}
			</div>
    	}
	 </div>	);
}

export default InnerContent
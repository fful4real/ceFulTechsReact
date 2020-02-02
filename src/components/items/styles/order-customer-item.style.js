import styled from 'styled-components'
const OrderCustomerItemStyle = styled.div`
    div.media {
				padding: 10px 15px;
				transition: width 2s;
				.media-img-wrap {
					position:relative;
					margin-right:15px;
					.avatar {
						height:45px;
						width:45px;
					}
					.badge-indicator {
						bottom: 7px;
						height: 7px;
						right: 4px;
						position: absolute;
						width: 7px;
					}
				}
				.media-body {
					display: -webkit-box;
                    display: -ms-flexbox;
                    cursor: pointer;
					display: flex;
					justify-content: space-between;
					-webkit-justify-content: space-between;
					-ms-flex-pack: space-between;
					>div:First-child {
						.user-name,
						.user-last-chat {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							max-width:270px;
						}
						.user-name {
							text-transform:capitalize;
                            color:#324148;
                            
						}
						.user-last-chat {
							font-size: 14px;
							line-height: 24px;
							color:#5e7d8a;
						}	
					}
					>div:last-child { 
						text-align:right;
						.last-chat-time {
							font-size: 13px;
						}
					}
				}
				&:hover {
					background:$light;
				}
				&.read-chat {
					.media-body {
                        cursor: pointer;
						>div:last-child {
							.last-chat-time {
								color:#5e7d8a;
							}
						}	
					}	
				}
				&.active-user {
					background:$light;
				}
			}
		
`;

export default OrderCustomerItemStyle;
import styled from "styled-components";

interface ArticleDefaultProps {
    isDismissed: boolean
}

export const Article = styled.article<ArticleDefaultProps>(props => {
    return {
        position: 'relative',
        transition: 'all .7s',
        ':hover': {
            'background-color': '#464646',
            cursor: 'pointer',
        },
        transform: props.isDismissed ? 'translateX(-400px) scale(1)' : 'translateX(0) scale(1)',
        opacity: props.isDismissed ? '0' : '1',
        height: props.isDismissed ? '0' : 'auto',
        padding: props.isDismissed ? '0' : '15px',
    }
});


export const Header = styled.header`
	display: flex;
	position: relative;
	align-items: center;
	
	> h1 {
		color: #fff;
		margin-right: 10px;
    	font-size: 20px;
    	font-weight: 300;
    	overflow: hidden;
    	white-space: nowrap;
    	max-width: 200px;
    	text-overflow: ellipsis;
	}
	
	> span {
		color: #fff;
		font-size: 14px;
		opacity: .7;
		padding-top: 2px;
	}
	
	.mdl-button {
		position: absolute;
    	top: 20px;
		right: 0;
	}
`;

const viewComponent = `
	padding: 10px;
	border-radius: 50%;
	margin-right: 10px;
`;

export const Viewed = styled.div`
	${viewComponent}
	background-color: rgb(177,177,177);
`;
export const UnViewed = styled.div`
${viewComponent}
	background-color: #ffc107;
`;

export const Button = styled.button`
 position: absolute;
 right: 0;
 top: 0;
 bottom: 0;
 width: 30px;
 border: none;
 background: none;
 color: white;
 font-size: 20px;
`;

const sizeImage = 70;

export const Body = styled.section`
	display: flex;
	color: #fff;
	img {
		border-radius: 50%;
		height: fit-content;
        padding: 0 2em;
    	height: ${sizeImage}px;
    	min-width: ${sizeImage}px;
    	overflow: hidden;
    	--background-image: url("http://placehold.it/${sizeImage}x${sizeImage}");
    	img[src=''] { display: none; }
	}
	
`;

export const Footer = styled.section`
	display: flex;
	color: #fff;
	justify-content: space-between;
`;
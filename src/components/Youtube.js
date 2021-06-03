import YouTubePlayer from 'react-player';
import styled from 'styled-components';

function YouTube({ link, videoID }) {
    

    return (
    <>
        <Video>
            <YouTubePlayer
                url={`https://www.youtube.com/watch?v=${videoID}`}
                controls={true}
                width="480px"
            />
        </Video>
        <Span>{link}</Span> 
    </>
    );
}

export default YouTube;

const Video = styled.div`
    margin-top: 14px;
`;

const Span = styled.span`
    margin-top: 14px;
    font-size: 17px;
    color: #b7b7b7;
`;
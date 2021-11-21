// https://github.com/remarkjs/react-markdown/issues/635#issuecomment-956158474
// Mock react-markdown to avoid errors when testing as Jest 27.X.X
// doesn't fully support ESM
function remarkGfm() {}

export default remarkGfm

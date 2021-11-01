export default interface GithuPayload {
  ref: string;
  repository: {
    full_name: string;
    url: string;
  };
}
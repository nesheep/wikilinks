export type Wiki = {
  id: string;
  title: string;
  extract?: string;
  image?: string;
};

export type WikiLinks = {
  id: string;
  title: string;
  items: Wiki[];
  next?: string;
};

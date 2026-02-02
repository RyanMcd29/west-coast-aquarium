type SeoJsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  id?: string;
};

export default function SeoJsonLd({ data, id = "json-ld" }: SeoJsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

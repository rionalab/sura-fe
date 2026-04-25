import { Button as AntdBtn } from 'antd'

export default function Button({ label }: { label: string }) {
   return <AntdBtn type="primary">{label}</AntdBtn>
}

// 封装table组件
interface IColumnProps {
  name: string
}

interface ITableProps {
  columnWapper?: IColumnProps[];

}

export default function UseTableWapper() {
  return {
    name: 'chaimin',
    age: '18'
  }
} 
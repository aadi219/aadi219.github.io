import SubnavItem from './SubnavItem.tsx'
const SubNav = () => {
  return (
    <div className='subnav flex flex-col text-lg'>
       <SubnavItem linkTo='Bio' />
       <SubnavItem linkTo='Skills' />
       <SubnavItem linkTo='Projects' /> 
    </div>
  )
}

export default SubNav